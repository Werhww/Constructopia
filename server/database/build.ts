import { prisma } from "../server"; 


export async function findBuild(id: number) {
  const build =  await prisma.build.findUnique({
    where: { id },
    include: {
      categorys: true,
    }
  })

  if(!build) throw new Error("Build not found") 

  const views = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "View"
    }
  })

  const downloads = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "Download"
    }
  })

  const likes = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "Like"
    }
  })

  const dislikes = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "DisLike"
    }
  })

  return {
    ...build,
    views,
    downloads,
    likes,
    dislikes
  }
}