import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { StatusMenu } from "./menus/status-menu";
import type { Task } from "~/lib/types";
import { useTasks } from "~/lib/use-tasks";
import React from "react";

interface StatusProps {
	task: Task;
}

function Status({ task }: StatusProps) {
	const [isOpen, setisOpen] = React.useState(false);

	const { update, remove } = useTasks();

	const handleUpdate = (taskId: number, updates: Partial<Task>) => {
		update.mutate(
			{ taskId, updates },
			{
				onSuccess: () => {
					setisOpen(false);
				},
			},
		);
	};

	const handleDelete = (taskId: number) => {
		remove.mutate(taskId);
	};

	const StatusIcons: Record<Task["status"], string> = {
		pending: "i-lucide-circle text-secondary",
		inProgress: "i-lucide-loader-circle text-amber-500",
		done: "i-solar-check-circle-linear text-stone-400 dark:text-neutral-700",
	};

	return (
		<Popover open={isOpen} onOpenChange={setisOpen} placement="bottom-start">
			<PopoverTrigger asChild>
				<button
					data-status-button
					type="button"
					className={clsx(
						"rounded-full bg-transparent flex items-center justify-center",
					)}
					onClick={(e) => {
						e.stopPropagation();
						setisOpen(!isOpen);
					}}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							setisOpen(!isOpen);
						}
					}}
				>
					<div className={clsx(StatusIcons[task.status], "size-5")} />
				</button>
			</PopoverTrigger>
			<PopoverContent className="z-50 popover-content">
				<StatusMenu
					status={task.status}
					onStatusSelect={(newStatus) =>
						handleUpdate(task.id, { status: newStatus })
					}
					onDelete={() => handleDelete(task.id)}
				/>
			</PopoverContent>
		</Popover>
	);
}

export { Status };
