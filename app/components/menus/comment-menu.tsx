import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import clsx from "clsx";

interface CommentMenuProps {
	onDelete: () => void;
}

export function CommentMenu({ onDelete }: CommentMenuProps) {
	const [open, setOpen] = React.useState(false);
	const [confirmingDelete, setConfirmingDelete] = React.useState(false);

	function handleDeleteClick(e: React.MouseEvent) {
		e.stopPropagation();

		if (confirmingDelete) {
			onDelete();
			setOpen(false);
			return;
		}

		setConfirmingDelete(true);
	}

	function cancelDelete(e: React.MouseEvent) {
		e.stopPropagation();
		setConfirmingDelete(false);
	}

	return (
		<Popover open={open} onOpenChange={setOpen} placement="bottom-end">
			<PopoverTrigger asChild>
				<button
					type="button"
					className="i-solar-menu-dots-bold size-5 me-2 hover:bg-neutral-700 dark:hover:bg-stone-200"
					onClick={(e) => {
						e.stopPropagation();
						setOpen(!open);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							setOpen(!open);
						}
					}}
				/>
			</PopoverTrigger>

			<PopoverContent className="z-50 popover-content p-0">
				<div
					className={clsx(
						"bg-neutral-100 text-sm font-mono dark:bg-neutral-900 rounded-lg border dark:border-neutral-800 overflow-hidden shadow-lg transition-all duration-300",
						confirmingDelete ? "w-5.5rem" : "w-7rem",
					)}
				>
					{confirmingDelete ? (
						<div className="flex justify-center items-center gap-3 px-3 py-2">
							<button
								type="button"
								className="i-lucide-check w-5 h-5 text-red-500 animate-fade-in"
								onClick={handleDeleteClick}
							/>
							<button
								type="button"
								className="i-lucide-x w-5 h-5 text-secondary animate-fade-in"
								onClick={cancelDelete}
							/>
						</div>
					) : (
						<button
							type="button"
							className="w-full text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-800/10 flex gap-2 items-center bg-transparent py-2 px-3  transition-all duration-300"
							onClick={handleDeleteClick}
						>
							<div className="i-solar-trash-bin-trash-bold" />
							Delete
						</button>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
