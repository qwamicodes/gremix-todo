import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "./types";

export function useCommentDelete(taskId: number) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCommentRequest,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["comments", taskId] });
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});
}

async function deleteCommentRequest(id: number): Promise<Comment> {
	const res = await fetch("/comments", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id }),
	});

	if (!res.ok) throw new Error("Failed to delete comment");
	const data = await res.json();

	return data.comment;
}
