import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "./types";

export async function fetchComments(taskId: number): Promise<Comment[]> {
	const res = await fetch(`/comments?taskId=${taskId}`);

	if (!res.ok) throw new Error("Failed to fetch comments");
	const data = await res.json();

	return data.comments;
}

export async function deleteComment(id: number): Promise<Comment> {
	const res = await fetch("/comments", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id }),
	});

	if (!res.ok) throw new Error("Failed to delete comment");
	const data = await res.json();

	return data.comment;
}

export async function createComment({
	taskId,
	content,
	author,
}: {
	taskId: number;
	content: string;
	author: string;
}): Promise<Comment> {
	const res = await fetch("/comments", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ taskId, content, author }),
	});

	if (!res.ok) throw new Error("Failed to create comment");
	const data = await res.json();

	return data.comment;
}

export function useComments(taskId: number, enabled = false) {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ["comments", taskId],
		queryFn: () => fetchComments(taskId),
		enabled: !!taskId && enabled,
	});

	const create = useMutation({
		mutationFn: createComment,
		onSuccess: (newComment) => {
			queryClient.setQueryData<Comment[]>(["comments", taskId], (old = []) => [
				...old,
				newComment,
			]);
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	const remove = useMutation({
		mutationFn: deleteComment,
		onMutate: async (commentId: number) => {
			await queryClient.cancelQueries({ queryKey: ["comments", taskId] });

			const previous = queryClient.getQueryData<Comment[]>([
				"comments",
				taskId,
			]);

			queryClient.setQueryData<Comment[]>(["comments", taskId], (old = []) =>
				old.map((c) =>
					c.id === commentId ? { ...c, deletedAt: new Date() } : c,
				),
			);

			return { previous };
		},
		onError: (_err, _id, context) => {
			if (context?.previous) {
				queryClient.setQueryData(["comments", taskId], context.previous);
			}
		},
		onSuccess: (updatedComment) => {
			queryClient.setQueryData<Comment[]>(["comments", taskId], (old = []) =>
				old.map((c) => (c.id === updatedComment.id ? updatedComment : c)),
			);
			queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	return { ...query, create, remove };
}
