import React from "react";

interface EditTaskInputProps {
	value: string;
	onChange: (value: string) => void;
	onConfirm: () => void;
	onCancel: () => void;
}

export function EditTaskInput({
	value,
	onChange,
	onConfirm,
	onCancel,
}: EditTaskInputProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			inputRef.current?.focus();
		}, 100);

		return () => clearTimeout(timeout);
	}, []);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			onConfirm();
		} else if (e.key === "Escape") {
			onCancel();
		}
	};

	return (
		<div className="flex flex-1 items-center gap-2" data-edit-task-input>
			<input
				ref={inputRef}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={handleKeyDown}
				className="px-2 py-0 font-medium border-b border-0 bg-transparent dark:border-neutral-700 w-full bg-stone-200/40 focus:outline-none focus:ring-0"
			/>
			<div className="flex gap-2 items-center">
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onCancel();
					}}
					className="i-lucide-x text-secondary w-5 h-5"
					aria-label="Cancel"
				/>
			</div>
		</div>
	);
}
