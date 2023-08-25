import { doc, getDoc } from "firebase/firestore"

export async function fetchDocData<T>(ref: ReturnType<typeof doc>) {
    console.log("fetchDocData")

    const docSnap = await getDoc(ref)
    if (!docSnap.exists()) return null
    return (docSnap.data() || null) as T | null
}
