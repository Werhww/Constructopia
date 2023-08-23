import { CatergoryDocument } from "~/utils/useTypes"

export default async function(seach:string){ 
    const categoryies = await getDocs(query(categoryRef, where('name', '==', seach), limit(10)))
    if (categoryies.empty) throw new Error('No categoryies found')

    return  categoryies.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }  as CatergoryDocument
    })
} 