import React from "react";
import { Input } from "./input";

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
			<Input
				ref={inputRef}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={handleKeyDown}
				className="px-2 py-1 border"
			/>

			<div className="flex gap-2 items-center">
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onConfirm();
					}}
					className="i-lucide-check text-secondary w-5 h-5"
					aria-label="Confirm"
				/>
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
