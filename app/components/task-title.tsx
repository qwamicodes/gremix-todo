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
		<div className="font-medium flex items-center gap-2">
			{priority && (
				<span
					className={clsx(
						"rounded p-0.5 text-xs font-semibold",
						priority.color,
					)}
				>
					{priority.label}
				</span>
			)}

			<div
				className={clsx({
					"line-through font-normal text-secondary": task.status === "done",
				})}
			>
				{displayTitle}
				<span className="text-secondary ms-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
					#{task.id}
				</span>
			</div>
		</div>
	);
}
