import { useComments } from "~/lib/use-comments";
import { CommentComposer } from "./comment-composer";
import { TaskComment } from "./task-comment";
import { useCommentDelete } from "~/lib/use-comment-delete";

interface Props {
	opened: boolean;
	taskId: number;
}

export function TaskComments({ opened, taskId }: Props) {
	const { data: comments = [] } = useComments(taskId, opened);
	const remove = useCommentDelete(taskId);

	if (!opened) return null;

	return (
		<ul className="border-t border-stone-200 dark:border-neutral-700/50">
			{comments.map((comment) => (
				<TaskComment
					key={comment.id}
					taskId={taskId}
					comment={comment}
					onDelete={() => remove.mutate(comment.id)}
				/>
			))}

			<li>
				<div className="bg-stone-200/60 dark:bg-neutral-800/50 p-2 ps-12">
					<CommentComposer taskId={taskId} />
				</div>
			</li>
		</ul>
	);
}
