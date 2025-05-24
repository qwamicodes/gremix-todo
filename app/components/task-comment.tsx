import clsx from "clsx";
import { authorTime } from "~/lib/dates";
import type { Comment } from "~/lib/types";
import { CommentMenu } from "./comment-menu";
import { Content } from "./content";

interface TaskCommentProps {
	comment: Comment;
	onDelete: () => void;
}

function TaskComment({ comment, onDelete }: TaskCommentProps) {
	return (
		<li>
			<div className="flex flex-col gap-2 p-2 ms-5 ps-7 border-s-2 border-stone-200/60 dark:border-neutral-700">
				<div className="flex justify-between gap-4">
					<div
						className={clsx("flex-1", {
							"italic text-secondary": comment.deletedAt,
						})}
					>
						<header className="text-sm font-mono text-secondary">
							@{comment.author.username} &bull; {authorTime(comment.createdAt)}
						</header>

						{comment.deletedAt ? (
							<p className="text-neutral-500 dark:text-neutral-400 italic text-sm">
								This message was deleted
							</p>
						) : (
							<Content content={comment.content} />
						)}
					</div>

					{!comment.deletedAt && <CommentMenu onDelete={onDelete} />}
				</div>
			</div>
		</li>
	);
}

export { TaskComment };
