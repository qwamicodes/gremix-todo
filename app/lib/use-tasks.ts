import {
	type QueryFunctionContext,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import type { Task } from "./types";

interface PaginatedTasks {
	tasks: Task[];
	nextPage?: number;
}

export async function fetchTasks({
	pageParam = 0,
}: QueryFunctionContext): Promise<PaginatedTasks> {
	const res = await fetch(`/list?page=${pageParam as number}`);
	const data = await res.json();

	return {
		tasks: data.tasks,
		nextPage: data.tasks.length > 0 ? (pageParam as number) + 1 : undefined,
	};
}

export async function deleteTask(taskId: number): Promise<void> {
	await fetch("/list", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ taskId }),
	});
}

export async function createTask(task: Partial<Task>): Promise<Task> {
	const res = await fetch("/list", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(task),
	});

	const data = await res.json();

	return data.task;
}

export async function updateTaskRequest({
	taskId,
	updates,
}: {
	taskId: number;
	updates: Partial<Task>;
}): Promise<Task> {
	const res = await fetch("/list", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ taskId, ...updates }),
	});

	const data = await res.json();

	return data.task;
}

export function useTasks() {
	const queryClient = useQueryClient();

	const tasksQuery = useInfiniteQuery<PaginatedTasks>({
		queryKey: ["tasks"],
		queryFn: fetchTasks,
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: 0,
	});

	const create = useMutation({
		mutationFn: createTask,
		onSuccess: (newTask) => {
			queryClient.setQueryData(["tasks"], (old: any) => {
				if (!old) return old;

				return {
					...old,
					pages: old.pages.map((page: any, index: number) =>
						index === 0 ? { ...page, tasks: [newTask, ...page.tasks] } : page,
					),
				};
			});
		},
	});

	const update = useMutation({
		mutationFn: updateTaskRequest,

		onMutate: async ({ taskId, updates }) => {
			await queryClient.cancelQueries({ queryKey: ["tasks"] });

			const previous = queryClient.getQueryData(["tasks"]);

			queryClient.setQueryData(["tasks"], (old: any) => ({
				...old,
				pages: old.pages.map((page: any) => ({
					...page,
					tasks: page.tasks.map((t: Task) =>
						t.id === taskId ? { ...t, ...updates } : t,
					),
				})),
			}));

			return { previous };
		},

		onError: (_err, _variables, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["tasks"], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	const remove = useMutation({
		mutationFn: deleteTask,

		onMutate: async (taskId: number) => {
			await queryClient.cancelQueries({ queryKey: ["tasks"] });

			const previous = queryClient.getQueryData(["tasks"]);

			queryClient.setQueryData(["tasks"], (old: any) => ({
				...old,
				pages: old.pages.map((page: any) => ({
					...page,
					tasks: page.tasks.filter((t: Task) => t.id !== taskId),
				})),
			}));

			return { previous };
		},

		onError: (_err, taskId, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["tasks"], context.previous);
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	return { ...tasksQuery, create, update, remove };
}
