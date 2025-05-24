import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "./types";

export function useCommentDelete(taskId: number) {
	const queryClient = useQueryClient();

	const remove = useMutation({
		mutationKey: ["delete-comment"],
		mutationFn: deleteCommentRequest,
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

	return remove;
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
