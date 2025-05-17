import clsx from "clsx";
import React from "react";
import { CommentComposer } from "./comment-input";

// TODO: on hover the status bar should show who created the task and when

interface Props {
	title: string;
	status: "todo" | "in-progress" | "done";
	assignee: string;
}

export function TodoItem({ title, status, assignee }: Props) {
	const [opened, setOpened] = React.useState(false);

	return (
		<div>
			<div
				className="flex items-center gap-4 p-2 hover:bg-stone-200 dark:hover:bg-neutral-800 focus:bg-stone-200 dark:focus:bg-neutral-800 cursor-pointer"
				onClick={() => setOpened(!opened)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						setOpened(!opened);
					}
				}}
				tabIndex={0}
			>
				<div
					className={clsx(
						"size-6 rounded-full border-2 border-stone-300 dark:border-neutral-700 flex items-center justify-center",
						{
							"!border-amber-500": status === "in-progress",
						},
					)}
				>
					{status === "done" && <div className="i-lucide-check opacity-50" />}
				</div>

				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div
							className={clsx("font-medium", {
								"line-through font-normal text-secondary": status === "done",
							})}
						>
							{title}
						</div>
					</div>
				</div>

				<div className="flex gap-3 items-center">
					<div className="flex items-center gap-1 text-sm font-mono text-secondary">
						<img
							src={`https://api.dicebear.com/9.x/dylan/svg?seed=${assignee}`}
							className="rounded-full size-5 bg-blue-500"
							alt={assignee}
						/>{" "}
						@{assignee}
					</div>

					<div className="text-sm text-secondary">2h</div>

					<div className="flex gap-1 text-sm items-center text-secondary">
						<div className="i-solar-chat-line-line-duotone" /> 2
					</div>
				</div>
			</div>

			{opened && (
				<ul className="border-t border-stone-200 dark:border-neutral-700/50">
					<li>
						<div className="flex flex-col gap-2 p-2 ms-10">
							<div>
								<header className="text-sm font-mono text-secondary">
									@notgr &bull; 8.11pm
								</header>
								<p>
									Please implement this feature without the redirect to the shop
									site.
								</p>
							</div>
						</div>
					</li>

					<li>
						<div className="bg-stone-100 dark:bg-neutral-800 p-2 ps-12">
							<CommentComposer />
						</div>
					</li>
				</ul>
			)}
		</div>
	);
}
