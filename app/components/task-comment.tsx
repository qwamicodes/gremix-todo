import { authorTime } from "~/lib/dates";
import { CommentMenu } from "./menus/comment-menu";
import type { Comment } from "~/lib/types";

interface TCommentProps {
	comment: Comment;
	onDelete: () => void;
}

function TComment({ comment, onDelete }: TCommentProps) {
	return (
		<li>
			<div className="flex flex-col gap-2 p-2 ms-5 ps-7 border-s-2 border-stone-200/60 dark:border-neutral-700">
				<div className="flex justify-between">
					<div className={comment.deletedAt ? "italic text-secondary" : ""}>
						<header className="text-sm font-mono text-secondary">
							@{comment.author} &bull; {authorTime(comment.createdAt)}
						</header>

						{comment.deletedAt ? (
							<p className="text-neutral-500 dark:text-neutral-400 italic">
								This message was deleted
							</p>
						) : (
							<p>{comment.content}</p>
						)}
					</div>

					{!comment.deletedAt && <CommentMenu onDelete={onDelete} />}
				</div>
			</div>
		</li>
	);
}

export { TComment };
