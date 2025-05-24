import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { AssigneeMenu } from "./menus/assignee-menu";
import type { Task } from "~/lib/types";
import { useTaskUpdate } from "~/lib/use-task-update";
import clsx from "clsx";

interface AssigneeProps {
	task: Task;
}

function Assignee({ task }: AssigneeProps) {
	const update = useTaskUpdate(task);

	return (
		<Popover placement="bottom-end">
			<PopoverTrigger asChild>
				<button
					data-assignee-button
					type="button"
					className={clsx(
						"flex items-center gap-1 bg-transparent text-sm font-mono text-secondary",
					)}
					onClick={(e) => {
						e.stopPropagation();
					}}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
						}
					}}
				>
					<img
						src={`https://api.dicebear.com/9.x/dylan/svg?seed=${task.assignee}`}
						className="rounded-full size-5 bg-blue-500"
						alt={task.assignee}
					/>{" "}
					@{task.assignee}
				</button>
			</PopoverTrigger>

			<PopoverContent className="z-50 popover-content">
				<AssigneeMenu
					task={task}
					onAssigneeUpdate={(assignee) => update.mutate({ assignee })}
				/>
			</PopoverContent>
		</Popover>
	);
}

export { Assignee };
