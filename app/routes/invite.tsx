import { addHours } from "date-fns";
import { customAlphabet } from "nanoid";
import { prisma } from "~/lib/prisma.server";

const token = customAlphabet(
	"abcde0123456789fghijklmnABCDEFGHNOPopqrstWXYZuvwxyz",
	10,
);

export const loader = async () => {
	const expiresAt = addHours(new Date(), 12);

	await prisma.inviteToken.create({
		data: {
			token: token(),
			expiresAt,
		},
	});

	return { token };
};
