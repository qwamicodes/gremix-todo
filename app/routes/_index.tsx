import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/header";
import { StatusBar } from "~/components/status-bar";
import { Todos } from "~/components/todos";
import { prisma } from "~/lib/prisma.server";

export const loader = async () => {
	const [{ total, done }] = (await prisma.$queryRaw`
		SELECT
			COUNT(*) as total,
			COUNT(CASE WHEN status = 'done' THEN 1 END) as done
		FROM "Task"
	`) satisfies { total: bigint; done: bigint }[];

	return { done: Number(done), total: Number(total) };
};

export const meta: MetaFunction = () => {
	return [
		{ title: "Get stuff done | Todo List" },
		{ name: "description", content: "Just do it!" },
	];
};

export default function Index() {
	return (
		<div className="flex flex-col h-screen">
			<Header />

			<div className="flex-1 h-0">
				<Todos />
			</div>

			<StatusBar />
		</div>
	);
}
