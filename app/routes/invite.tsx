import { addHours } from "date-fns";
import { customAlphabet } from "nanoid";
import { prisma } from "~/lib/prisma.server";

const generateToken = customAlphabet(
	"abcde0123456789fghijklmnABCDEFGHNOPopqrstWXYZuvwxyz",
	10,
);

export const loader = async () => {
	const expiresAt = addHours(new Date(), 12);
	const token = generateToken();

	await prisma.inviteToken.create({
		data: { token, expiresAt },
	});

	return { token };
};
