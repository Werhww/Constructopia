import { prisma } from "../server"


export function createUser(user: {
    name: string;
    mcID: string;
}) {
  return prisma.user.create({
    data: user,
  }).catch((e) => 201)
}