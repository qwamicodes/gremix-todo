import React from "react";
import { authorTime } from "~/lib/dates";
import type { Comment } from "~/lib/types";
import { CommentComposer } from "./comment-composer";

interface Props {
	opened: boolean;
	taskId: number;
}

type Status = "idle" | "loading" | "loaded" | "error";

export function TaskComments({ opened, taskId }: Props) {
	const [comments, setComments] = React.useState<Comment[]>([]);
	const [status, setStatus] = React.useState<Status>("idle");

	function handleNewEntry(comment: Comment) {
		setComments((prev) => [...prev, comment]);
	}

	React.useEffect(() => {
		if (!opened || status !== "idle") return;

		setStatus("loading");
		fetch(`/comments?taskId=${taskId}`)
			.then((res) => res.json())
			.then((data) => setComments(data.comments))
			.finally(() => setStatus("loaded"));
	}, [taskId, opened, status]);

	if (!opened) {
		return null;
	}

	return (
		<ul className="border-t border-stone-200 dark:border-neutral-700/50">
			{comments.map((comment) => (
				<li key={comment.id}>
					<div className="flex flex-col gap-2 p-2 ms-5 ps-7 border-s-2 border-stone-200/60 dark:border-neutral-700">
						<div>
							<header className="text-sm font-mono text-secondary">
								@{comment.author} &bull; {authorTime(comment.createdAt)}
							</header>
							<p>{comment.content}</p>
						</div>
					</div>
				</li>
			))}

			<li>
				<div className="bg-stone-200/60 dark:bg-neutral-800/50 p-2 ps-12">
					<CommentComposer onAdd={handleNewEntry} taskId={taskId} />
				</div>
			</li>
		</ul>
	);
}
