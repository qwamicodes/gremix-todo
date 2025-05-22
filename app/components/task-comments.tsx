import { useComments } from "~/lib/use-comments";
import { CommentComposer } from "./comment-composer";
import { authorTime } from "~/lib/dates";

interface Props {
	opened: boolean;
	taskId: number;
}

export function TaskComments({ opened, taskId }: Props) {
	const { data: comments = [] } = useComments(taskId);

	if (!opened) return null;

	return (
		<ul className="border-t border-stone-200 dark:border-neutral-700/50">
			{comments.map((comment) => (
				<li key={comment.id}>
					<div className="flex flex-col p-1 ms-5 ps-7 border-s-2 border-stone-200/60 dark:border-neutral-700">
						<header className="text-sm font-mono text-secondary">
							@{comment.author} &bull; {authorTime(comment.createdAt)}
						</header>
						<p>{comment.content}</p>
					</div>
				</li>
			))}

			<li>
				<div className="bg-stone-200/60 dark:bg-neutral-800/50 p-2 ps-12">
					<CommentComposer taskId={taskId} />
				</div>
			</li>
		</ul>
	);
}
