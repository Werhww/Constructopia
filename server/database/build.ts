import { prisma } from "../server"

export async function findBuild(id: number) {
  const build = await prisma.build.findUnique({
    where: { id },
    include: {
      categorys: true,
    },
  })

  if (!build) throw new Error("Build not found")

  const views = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "View",
    },
  })

  const downloads = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "Download",
    },
  })

  const likes = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "Like",
    },
  })

  const dislikes = await prisma.interaction.count({
    where: {
      buildId: id,
      type: "DisLike",
    },
  })

  return {
    ...build,
    views,
    downloads,
    likes,
    dislikes,
  }
}

export async function getBuildFiles(buildId: number) {
  const build = await prisma.buildFiles.findMany({
    where: { buildId },
  })

  return build
}

export async function getBuildRating(buildId: number) {
  const build = await prisma.interaction.findMany({
    where: {
      buildId,
      type: "Rating",
    },
  })

  const rating =
    build.reduce((acc, curr) => {
      const value = curr.rating ? curr.rating : 0

      return acc + value
    }, 0) / build.length


  return rating
}
