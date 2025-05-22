function cleanUpdate(payload: Record<string, any>) {
	const { id: _, taskId, createdAt, updatedAt, comments, ...rest } = payload;

	return { id: taskId, updates: rest };
}

export { cleanUpdate };
