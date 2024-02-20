import { prisma } from "../server"; 


export async function findBuild(id: number) {
  return await prisma.build.findUnique({
    where: { id },
    select: {
        name: true,
        description: true,
        images: true,  

        views: true,
        blockCount: true,
        downloads: true,
        size: true,
        difficulty: true,

        createdAt: true,
        updatedAt: true,

        user: true,
        category: true,

        likeCount: true
    }
  }).catch((e) => 201)
}