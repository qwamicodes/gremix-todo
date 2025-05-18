import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "~/lib/prisma.server";
import { badRequest } from "~/lib/responses";

export async function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url);
	const taskId = url.searchParams.get("taskId");

	if (!taskId) {
		throw badRequest({ error: "taskId is required" });
	}

	const comments = await prisma.comment.findMany({
		where: {
			taskId: Number(taskId),
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	return { comments };
}

export async function action({ request }: ActionFunctionArgs) {
	const data = await request.json();

	const comment = await prisma.comment.create({ data });

  return { comment };
}
