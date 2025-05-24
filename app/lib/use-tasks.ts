import {
	type QueryFunctionContext,
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import type { Task } from "./types";

export function useTasks() {
	const queryClient = useQueryClient();

	const tasksQuery = useInfiniteQuery({
		queryKey: ["tasks"],
		queryFn: fetchTasks,
		getNextPageParam: (_, pages) => pages.length,
		initialPageParam: 0,
		staleTime: 1000 * 60 * 5,
	});

	const create = useMutation({
		mutationFn: createTask,
		onSuccess: (newTask) => {
			type Old = { pageParams: number[]; pages: Task[][] };
			queryClient.setQueryData(["tasks"], (old?: Old) => {
				if (!old) return;

				const [top, ...rest] = old.pages;

				return {
					pageParams: old.pageParams,
					pages: [[newTask, ...top], ...rest],
				};
			});
		},
		onError: (err) => {
			console.error(err);
		},
	});

	return { query: tasksQuery, create };
}

export async function fetchTasks({
	pageParam = 0,
}: QueryFunctionContext): Promise<Task[]> {
	const res = await fetch(`/list?page=${pageParam as number}`);
	const data = await res.json();

	return data.tasks;
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
