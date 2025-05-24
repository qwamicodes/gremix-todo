import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function NotificationsButton() {
	const count = 4;

	return (
		<Popover placement="bottom-end">
			<PopoverTrigger className="bg-transparent">
				<div
					className={clsx(
						"bg-stone-200 flex items-center justify-center rounded-full px-2 font-mono flex items-center gap-2 text-secondary",
						{ "!bg-orange-500 !text-white animate-shake": count },
					)}
				>
					<div className="i-solar-bell-linear text-lg" /> {count}
				</div>
			</PopoverTrigger>

			<PopoverContent className="z-100 animate-fade-in animate-duration-200">
				<NotificationsList />
			</PopoverContent>
		</Popover>
	);
}

function NotificationsList() {
	return (
		<div className="w-24rem border rounded-xl bg-stone-50 dark:(bg-neutral-900 border-neutral-800) max-h-30rem overflow-y-auto shadow-lg">
			<header className="font-medium text-secondary text-sm p-2 pb-0">
				Notifications (4)
			</header>

			<ul className="divide-y dark:divide-neutral-800">
				<li>
					<button
						className="text-start flex w-full bg-transparent hover:bg-stone-100 dark:hover:bg-neutral-800 p-2 gap-2"
						type="button"
					>
						<div className="pt-1">
							<div className="i-solar-user-hands-line-duotone text-secondary" />
						</div>
						<div className="flex-1">
							<span className="font-mono text-blue-500">@notgr</span> assigned
							you to "Hello world, this is the beginning"
						</div>
					</button>
				</li>

				<li>
					<button
						className="text-start flex w-full bg-transparent hover:bg-stone-100 p-2 gap-2"
						type="button"
					>
						<div className="pt-1">
							<div className="i-solar-user-hands-line-duotone text-secondary" />
						</div>
						<div className="flex-1">
							<span className="font-mono text-blue-500">@notgr</span> left a
							comment on your task: "Add another post"
						</div>
					</button>
				</li>
			</ul>
		</div>
	);
}
