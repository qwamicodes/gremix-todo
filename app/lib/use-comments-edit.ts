import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "./types";

export function useCommentEdit(taskId: number) {
	const queryClient = useQueryClient();

	const edit = useMutation({
		mutationKey: ["edit-comment"],
		mutationFn: updateCommentRequest,
		onSuccess: (updatedComment) => {
			queryClient.setQueryData<Comment[]>(["comments", taskId], (old = []) =>
				old.map((c) => (c.id === updatedComment.id ? updatedComment : c)),
			);
			queryClient.invalidateQueries({ queryKey: ["tasks"] });
		},
	});

	return edit;
}

async function updateCommentRequest({
	id,
	content,
	authorId,
}: {
	id: number;
	content: string;
	authorId: number;
}): Promise<Comment> {
	const res = await fetch("/edit-comment", {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ id, content, authorId }),
	});

	if (!res.ok) throw new Error("Failed to update comment");
	const data = await res.json();

	return data.comment;
}
