export function CommentComposer() {
	return (
		<div>
			<textarea
				className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0"
				placeholder="Add a comment"
				rows={3}
			/>

			<div className="text-sm text-secondary">
				<div className="flex items-center gap-2">
					<div className="i-solar-link-round-angle-bold-duotone" /> Drop files
					here
				</div>
			</div>
		</div>
	);
}
