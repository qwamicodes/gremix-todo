import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "./types";

export async function fetchComments(taskId: number): Promise<Comment[]> {
	const res = await fetch(`/comments?taskId=${taskId}`);

	if (!res.ok) throw new Error("Failed to fetch comments");
	const data = await res.json();

	return data.comments;
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

export function useComments(taskId: number) {
	const queryClient = useQueryClient();

	const query = useQuery({
		queryKey: ["comments", taskId],
		queryFn: () => fetchComments(taskId),
		enabled: !!taskId,
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

	return { ...query, create };
}
