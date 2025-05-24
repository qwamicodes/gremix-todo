import React from "react";
import clsx from "clsx";
import { authorTime } from "~/lib/dates";
import type { Comment } from "~/lib/types";
import { CommentMenu } from "./comment-menu";
import { Content } from "./content";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useCommentEdit } from "~/lib/use-comments-edit";
import { EditCommentInput } from "./edit-comment-input";
import type { loader } from "~/routes/_index";

interface TaskCommentProps {
	taskId: number;
	comment: Comment;
	onDelete: () => void;
}

function TaskComment({ comment, onDelete, taskId }: TaskCommentProps) {
	const [isEditing, setIsEditing] = React.useState(false);
	const [draft, setDraft] = React.useState("");

	const fetcher = useFetcher<{ content: string }>();
	const { user } = useLoaderData<typeof loader>();

	const edit = useCommentEdit(taskId);

	React.useEffect(() => {
		if (isEditing) {
			fetcher.load(`/edit-comment?id=${comment.id}`);
		}
	}, [isEditing, comment.id]);

	React.useEffect(() => {
		if (fetcher.data?.content && isEditing) {
			setDraft(fetcher.data.content);
		}
	}, [fetcher.data, isEditing]);

	return (
		<li>
			<div className="flex flex-col gap-2 p-2 ms-5 ps-7 border-s-2 border-stone-200/60 dark:border-neutral-700">
				<div className="flex justify-between gap-4">
					<div
						className={clsx("flex-1 overflow-x-auto", {
							"italic text-secondary": comment.deletedAt,
						})}
					>
						<header className="text-sm font-mono text-secondary">
							@{comment.author.username} • {authorTime(comment.createdAt)}{" "}
							{comment.editedAt && !comment.deletedAt && (
								<span className="text-xs">(edited)</span>
							)}
						</header>

						{comment.deletedAt ? (
							<p className="text-neutral-500 dark:text-neutral-400 italic text-sm">
								This message was deleted
							</p>
						) : isEditing && fetcher.data ? (
							<EditCommentInput
								value={draft}
								onChange={setDraft}
								onConfirm={() => {
									edit.mutate({
										id: comment.id,
										content: draft.trim(),
										authorId: user.id,
									});
									setIsEditing(false);
								}}
								onCancel={() => {
									setIsEditing(false);
									setDraft("");
								}}
							/>
						) : (
							<Content content={comment.content} />
						)}
					</div>

					{user.id === comment.authorId && !comment.deletedAt && (
						<CommentMenu
							onDelete={onDelete}
							onEdit={() => setIsEditing(true)}
						/>
					)}
				</div>
			</div>
		</li>
	);
}

export { TaskComment };
