import { prisma } from "../server";

export function createUser(user: {
    minecraftId: string;
    minecraftName: string;
}) {
  return prisma.user.create({
    data: user,
  });
}

