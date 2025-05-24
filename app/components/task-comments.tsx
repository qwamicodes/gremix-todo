import { useComments } from "~/lib/use-comments";
import { CommentComposer } from "./comment-composer";
import { TaskComment } from "./task-comment";

interface Props {
	opened: boolean;
	taskId: number;
}

export function TaskComments({ opened, taskId }: Props) {
	const { data: comments = [], status } = useComments(taskId, opened);

	if (!opened) return null;

	return (
		<ul className="border-t border-stone-200 dark:border-neutral-700/50">
			{comments.map((comment) => (
				<TaskComment key={comment.id} taskId={taskId} comment={comment} />
			))}

			{status === "pending" && (
				<li className="flex justify-center items-center py-2">
					<div className="i-svg-spinners:3-dots-fade" />
				</li>
			)}

			<li>
				<div className="bg-stone-200/60 dark:bg-neutral-800/50 p-2 ps-12">
					<CommentComposer taskId={taskId} />
				</div>
			</li>
		</ul>
	);
}
