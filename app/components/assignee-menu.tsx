import type { Task } from "@prisma/client";
import { usePopoverContext } from "./popover";

interface AssigneeMenuProps {
	task: Task;
	onAssigneeUpdate: (assignee: string) => void;
}

function AssigneeMenu({ task, onAssigneeUpdate }: AssigneeMenuProps) {
	// []: load team members from a loader
	const team = [
		{ id: "user-1", name: "notgr" },
		{ id: "user-2", name: "ebarthur" },
		{ id: "user-3", name: "blackmann" },
	];

	const popover = usePopoverContext();

	function handleUpdate(assignee: string) {
		popover.setOpen(false);
		onAssigneeUpdate(assignee);
	}

	return (
		<div className="bg-neutral-100 text-sm dark:bg-neutral-900 rounded-lg w-12.5rem border dark:border-neutral-800 overflow-hidden shadow-lg mt-1.5">
			<header className="px-2 py-2.5 flex items-center justify-start">
				<div className="font-medium ms-2 text-secondary">
					{/* TODO: make this an input to search team members*/}
					Assign to...
				</div>
			</header>

			<hr className="dark:border-neutral-800" />

			<div className="p-1">
				{" "}
				<div className="w-full rounded-lg flex items-center justify-between py-2 px-3 text-secondary bg-transparent font-mono hover:bg-neutral-200/80 dark:hover:bg-neutral-800/20">
					<div className="flex gap-2">
						<img
							src={`https://api.dicebear.com/9.x/dylan/svg?seed=${task.assignee}`}
							className="rounded-full size-5 bg-blue-500"
							alt={task.assignee}
						/>
						{task.assignee}
					</div>

					<div className="i-lucide-check text-secondary" />
				</div>
			</div>

			<div className="font-medium ms-3 px-1 text-secondary">Team members</div>

			<ul className="space-y-1 p-1">
				{team
					.filter((t) => t.name !== task.assignee)
					.map((t) => (
						<li key={t.id}>
							<button
								type="button"
								className="w-full rounded-lg flex gap-2 items-center bg-transparent py-2 px-3 font-mono hover:bg-neutral-200/80 dark:hover:bg-neutral-800/20"
								onClick={(e) => {
									e.stopPropagation();
									handleUpdate(t.name);
								}}
							>
								<img
									src={`https://api.dicebear.com/9.x/dylan/svg?seed=${t.name}`}
									className="rounded-full size-5 bg-blue-500"
									alt={t.name}
								/>{" "}
								{t.name}
							</button>
						</li>
					))}
			</ul>
		</div>
	);
}

export { AssigneeMenu };
