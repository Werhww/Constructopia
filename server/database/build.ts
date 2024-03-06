import { prisma } from "../server"; 


export async function findBuild(id: number) {
  return await prisma.build.findUnique({
    where: { id },
    include: {
      category: true,
      user: true,
    }
  }).catch((e) => 201)
}