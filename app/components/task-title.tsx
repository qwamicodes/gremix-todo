import React from "react";
import clsx from "clsx";
import type { Task } from "~/lib/types";
import { getPriority } from "~/lib/get-priority";

interface Props {
	task: Task;
}

export function TaskTitle({ task }: Props) {
	const priority = getPriority(task.title);
	const displayTitle = task.title.replace(/^!+/, "").trim();

	return (
		<div
			className={clsx("font-medium flex items-center gap-2", {
				"line-through font-normal text-secondary": task.status === "done",
			})}
		>
			{priority && (
				<span
					className={`rounded p-0.5 text-xs font-semibold ${priority.color}`}
				>
					{priority.label}
				</span>
			)}

			{displayTitle}
		</div>
	);
}
