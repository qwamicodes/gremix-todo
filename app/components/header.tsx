import { Link, useLoaderData } from "@remix-run/react";
import type { loader } from "~/routes/_index";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select } from "./select";

export function Header() {
	return (
		<div className="flex justify-between items-center p-2 border-b dark:border-neutral-800">
			<div className="flex gap-6 items-center">
				<div>
					<div className="i-solar-archive-minimalistic-bold-duotone text-rose-500 text-2xl" />
				</div>

				<div className="flex rounded-full divide-x divide-stone-300/50 dark:divide-neutral-700/50 border dark:border-neutral-700/50 overflow-hidden">
					<div>
						<Input
							placeholder="Search for task"
							className="!w-20rem !rounded-0 !border-0 px-4"
						/>
					</div>

					<div>
						<Select className="!w-12rem !rounded-0 !border-0 bg-transparent">
							<option>Everyone</option>
						</Select>
					</div>
				</div>
			</div>

			<div className="flex items-center">
				<UserButton />
			</div>
		</div>
	);
}

function UserButton() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<Popover placement="bottom-end">
			<PopoverTrigger className="bg-stone-200/50 dark:bg-neutral-800/50 px-2 py-1 rounded-full">
				<div className="flex gap-2">
					<img
						src={`https://api.dicebear.com/9.x/dylan/svg?seed=${user.username}`}
						className="size-6 rounded-full bg-amber-500"
						alt="blackmann"
					/>
					<div className="font-mono">{user.username}</div>
				</div>
			</PopoverTrigger>
			<PopoverContent className="z-100">
				<UserMenu />
			</PopoverContent>
		</Popover>
	);
}

function UserMenu() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<div className="bg-stone-50 min-w-12rem rounded-lg overflow-hidden border shadow-lg">
			{user.superUser && (
				<header className="text-sm flex gap-2 items-center px-2 py-1 border-b border-stone-200/50 text-secondary">
					<div className="i-lucide-crown text-amber-500" /> Super User
				</header>
			)}

			<ul className="divide-y divide-stone-200/50">
				{user.superUser && (
					<li>
						<Link className="block px-2 py-1" to="/new-user">
							Add new user
						</Link>
					</li>
				)}

				<li>
					<Link className="block px-2 py-1" to="/logout">
						Logout
					</Link>
				</li>
			</ul>
		</div>
	);
}
