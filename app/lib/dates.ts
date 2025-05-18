import { differenceInDays, differenceInHours, format } from "date-fns";

export function age(date: Date) {
	const now = new Date();
	const hoursDiff = differenceInHours(now, date);

	if (hoursDiff < 48) {
		return `${hoursDiff}h`;
	}

	const daysDiff = differenceInDays(now, date);
	return `${daysDiff}d`;
}

export function authorTime(date: Date | string) {
	const now = new Date();
	const hoursDiff = differenceInHours(now, date);

	if (hoursDiff < 24) {
		return format(date, "hh.mma").toLocaleLowerCase();
	}

	return format(date, "MMM d, yyyy hh.mma").toLocaleLowerCase();
}
