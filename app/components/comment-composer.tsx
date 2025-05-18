import type { Comment } from "~/lib/types";

interface Props {
	onAdd: (comment: Comment) => void;
	taskId: number;
}

export function CommentComposer({ onAdd, taskId }: Props) {
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const content = formData.get("content") as string;

		if (!content.trim().length) return;

		const res = await fetch("/comments", {
			method: "POST",
			body: JSON.stringify({
				content: content.trim(),
				taskId,
				author: "ebarthur",
			}),
			headers: { "Content-Type": "application/json" },
		});

		if (!res.ok) {
			console.error(res);
			return;
		}

		const data = await res.json();
		onAdd(data.comment);

		(e.target as HTMLFormElement).reset();
	}

	return (
		<form
			onSubmit={handleSubmit}
			onKeyDown={(e) => {
				if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
					e.preventDefault();
					e.currentTarget.requestSubmit();
				}
			}}
		>
			<textarea
				className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0"
				placeholder="Add a comment"
				name="content"
				rows={3}
			/>

			<div className="text-sm text-secondary flex justify-between gap-4">
				<div className="flex items-center gap-2">
					<div className="i-solar-link-round-angle-bold-duotone" /> Drop files
					here
				</div>

				<button
					type="submit"
					className="flex gap-2 items-center bg-stone-300/60 px-2 rounded-full"
				>
					<div className="i-solar-command-linear" /> + Enter to send
				</button>
			</div>
		</form>
	);
}
