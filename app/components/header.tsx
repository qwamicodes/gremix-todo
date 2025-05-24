import { Input } from "./input";
import { NotificationsButton } from "./notification-button";
import { Select } from "./select";
import { UserButton } from "./user-button";

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

			<div className="flex items-center gap-2">
				<NotificationsButton />
				<UserButton />
			</div>
		</div>
	);
}
