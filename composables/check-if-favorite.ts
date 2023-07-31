export default async function (userId:string, buildId: string) {
    const userRequest = await getDoc(doc(favoriteRef, `${userId}-${buildId}`))
    return userRequest.exists()
}