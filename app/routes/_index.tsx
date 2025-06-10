import { tryit } from 'radashi';
import { type LoaderFunctionArgs, redirect } from "react-router";
import { checkAuth } from "~/lib/check-auth";
import { prisma } from "~/lib/prisma.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const [err, user] = await tryit(checkAuth)(request);

	if (err) {
		throw redirect("/auth");
	}

	const projects = await prisma.project.findMany({
		where: {
			ProjectAccess: {
				some: { userId: user.id },
			},
		},
		orderBy: {
			name: "asc",
		},
		select: {
			slug: true,
		},
	});

	if (projects.length === 0) {
		throw redirect("/logout");
	}

	const url = new URL(request.url);

	const top = projects[0];
	const toUrl = new URL(`/${top.slug}`, url);
	const confetti = url.searchParams.get("confetti");

	if (confetti) {
		toUrl.searchParams.set("confetti", confetti);
	}

	return redirect(toUrl.toString());
};
