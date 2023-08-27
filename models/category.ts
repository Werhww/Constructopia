import { categoryIdsRef, categoryRef, categoryRequestRef } from "assets/scripts/firebase"
import { getDoc, setDoc, doc } from "firebase/firestore"
import { CatergoryDocument, CategoryIdDocument } from "~/utils/useTypes"

export class Category {
    private ids: string[] = []

    constructor() {
        this.getIds()
    }

    async getIds() {
        this.ids = ((await getDoc(categoryIdsRef)).data() as CategoryIdDocument).ids
        console.log('Category ids: ', this.ids)
    }


    async seach(seach: string) {
        const FoundIds = this.getSimilarIds(seach)
        const categories: CatergoryDocument[] = []
        const MaxCategories = 10

        if (FoundIds.length === 0) throw new Error('No categories found')

        for (const id of FoundIds) {
            const category = await this.getCategory(id)
            categories.push(category)
            if (categories.length >= MaxCategories) break
        }

        return categories
    }

    getSimilarIds(seach: string) {
        return this.ids.filter(id => id.toLowerCase().includes(seach.toLowerCase()))
    }

    async create(seach: string, description: string) {
        /* addDoc(doc(categoryRequestRef), {
            name: seach,
            description: description,
            count: 0
        }) */

        setDoc(doc(categoryRef, seach), {
            name: seach,
            description: description,
            count: 0
        })

        await this.getIds()
        const categoryIds = [...this.ids, seach] 

        setDoc(categoryIdsRef, {
            ids: categoryIds
        })
    
        console.log('Request created')

    }

    async getCategory(id:string):Promise<CatergoryDocument> {
        const category = await getDoc(doc(categoryRef, id))
        return {
            id: category.id,
            name: category.data()?.name,
            description: category.data()?.description,
            count: category.data()?.count
        }
    }

}

export class CategoryCard {
    private category: CatergoryDocument = {} as any

    constructor(private id: string) {}

    async getCategory():Promise<CatergoryDocument> {
        if(this.category.id) return this.category

        const category = await getDoc(doc(categoryRef, this.id)).catch(
            () => {throw new Error('Category not found')}
        )

        return {
            id: category.id,
            name: category.data()?.name,
            description: category.data()?.description,
            count: category.data()?.count
        }
    }
}