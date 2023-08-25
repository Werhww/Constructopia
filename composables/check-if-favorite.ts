import { favoriteRef } from "assets/scripts/firebase"
import { getDoc, doc } from "firebase/firestore"

export default async function (userId:string, buildId: string) {
    const userRequest = await getDoc(doc(favoriteRef, `${userId}-${buildId}`))
    return userRequest.exists()
}