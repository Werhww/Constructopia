import { prisma } from "../server"; 

export function findCategory(id: number) {
  return prisma.category.findUnique({
    where: { id },
    include: { user: true }
  }).catch((e) => 201)
}