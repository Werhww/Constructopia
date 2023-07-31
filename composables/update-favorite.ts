export default function (userId:string, buildId: string, status: boolean) {
    if(status == true) {
        setDoc(doc(favoriteRef, `${userId}-${buildId}`), {
            userId: userId,
            buildId: buildId,
        })
    } else {
        deleteDoc(doc(favoriteRef, `${userId}-${buildId}`))
    }
}