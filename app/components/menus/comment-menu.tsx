import clsx from "clsx";
import React from "react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	usePopoverContext,
} from "../popover";

interface Props {
	onDelete: () => void;
}

export function CommentMenu({ onDelete }: Props) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover placement="bottom-end">
			<PopoverTrigger asChild>
				<button
					type="button"
					className="flex items-center justify-center size-8 me-2 dark:bg-neutral-800/50 dark:hover:bg-neutral-800 hover:bg-stone-200 rounded-full text-secondary"
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
				>
					<div className="i-solar-menu-dots-bold" />
				</button>
			</PopoverTrigger>

			<PopoverContent className="z-50 popover-content p-0">
				<Menu onDelete={onDelete} />
			</PopoverContent>
		</Popover>
	);
}

function Menu({ onDelete }: Props) {
	const [confirmingDelete, setConfirmingDelete] = React.useState(false);
	const popover = usePopoverContext();

	function handleDeleteClick(e: React.MouseEvent) {
		e.stopPropagation();
		onDelete();
		popover.setOpen(false);
	}

	return (
		<div
			className={clsx(
				"bg-neutral-100 text-sm font-mono dark:bg-neutral-900 rounded-lg border dark:border-neutral-800 overflow-hidden shadow-lg transition-all duration-300",
				confirmingDelete ? "w-12.5rem" : "w-10rem",
			)}
		>
			{confirmingDelete ? (
				<div className="flex items-center gap-3 px-3 py-2">
					<span className="whitespace-nowrap text-secondary">Are you sure?</span>
					<button
						type="button"
						className="i-lucide-check w-5 h-5 text-red-500 animate-fade-in animate-duration-200 "
						onClick={handleDeleteClick}
					/>
					<button
						type="button"
						className="i-lucide-x w-5 h-5 text-secondary animate-fade-in animate-duration-200 animate-delay-50"
						onClick={() => setConfirmingDelete(false)}
					/>
				</div>
			) : (
				<button
					type="button"
					className="w-full text-red-500 rounded-lg hover:bg-red-600/5 dark:hover:bg-red-800/10 flex gap-2 items-center bg-transparent py-2 px-3  transition-all duration-300"
					onClick={() => setConfirmingDelete(true)}
				>
					<div className="i-solar-trash-bin-trash-bold" />
					Delete
				</button>
			)}
		</div>
	);
}
