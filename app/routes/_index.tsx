import type { MetaFunction } from "@remix-run/node";
import { Header } from "~/components/header";
import { StatusBar } from "~/components/status-bar";
import { Todos } from "~/components/todos";

export const meta: MetaFunction = () => {
	return [
		{ title: "Get stuff done | TodoList" },
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
