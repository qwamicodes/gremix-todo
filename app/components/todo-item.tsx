import clsx from "clsx";
import React from "react";
import type { Task } from "~/lib/types";
import { age } from "~/lib/dates";
import { TaskComments } from "./task-comments";
import { Status } from "./status";
import { Assignee } from "./assignee";
import { useAtom } from "jotai";
import { hoveredTask } from "~/lib/store";

interface Props {
	task: Task;
}

export function TodoItem({ task }: Props) {
	const [opened, setOpened] = React.useState(false);

	const [, setHoveredTask] = useAtom(hoveredTask);

	const handleToggleOpen = (e: React.MouseEvent | React.KeyboardEvent) => {
		if (
			e.target instanceof HTMLElement &&
			(e.target.closest("[data-assignee-button]") ||
				e.target.closest("[data-status-button]") ||
				e.target.closest(".popover-content"))
		) {
			return;
		}
		setOpened(!opened);
	};

	return (
		<div>
			<div
				className="flex items-center gap-4 p-2 hover:bg-stone-200 dark:hover:bg-neutral-800 focus:bg-stone-200 dark:focus:bg-neutral-800 cursor-pointer"
				onClick={handleToggleOpen}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleToggleOpen(e);
					}
				}}
				onMouseEnter={() => {
					setHoveredTask(task);
				}}
				onMouseLeave={() => setHoveredTask(undefined)}
				// biome-ignore lint/a11y/noNoninteractiveTabindex: <explanation>
				tabIndex={0}
			>
				<Status task={task} />

				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div
							className={clsx("font-medium", {
								"line-through font-normal text-secondary":
									task.status === "done",
							})}
						>
							{task.title}
						</div>
					</div>
				</div>

				<div className="flex gap-3 items-center">
					<Assignee task={task} />

					<div className="text-sm text-secondary">{age(task.createdAt)}</div>

					<div className="flex gap-1 text-sm items-center text-secondary">
						<div className="i-solar-chat-line-line-duotone" /> {task.comments}
					</div>
				</div>
			</div>

			<TaskComments opened={opened} taskId={task.id} />
		</div>
	);
}
