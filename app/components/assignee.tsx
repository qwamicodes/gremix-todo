import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { AssigneeMenu } from "./assignee-menu";
import type { Task } from "~/lib/types";
import React from "react";
import { useTasks } from "~/lib/use-tasks";

interface AssigneeProps {
	task: Task;
}

function Assignee({ task }: AssigneeProps) {
	const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

	const { update } = useTasks();

	const handleUpdate = (taskId: number, updates: Partial<Task>) => {
		update.mutate({ taskId, updates });

		if (updates.assignee) {
			setIsPopoverOpen(false);
			return;
		}

		setIsPopoverOpen(false);
	};

	return (
		<Popover
			open={isPopoverOpen}
			onOpenChange={setIsPopoverOpen}
			placement="bottom-end"
		>
			<PopoverTrigger asChild>
				<button
					data-assignee-button
					type="button"
					className="flex items-center gap-1 bg-transparent text-sm font-mono text-secondary"
					onClick={(e) => {
						e.stopPropagation();
						setIsPopoverOpen(!isPopoverOpen);
					}}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							setIsPopoverOpen(!isPopoverOpen);
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
					assignee={task.assignee}
					onTeamMemberSelect={(newAssignee) =>
						handleUpdate(task.id, { assignee: newAssignee })
					}
				/>
			</PopoverContent>
		</Popover>
	);
}

export { Assignee };
