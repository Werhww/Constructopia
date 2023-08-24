import { CatergoryDocument } from "~/utils/useTypes"

export class Category {
    private ids: string[] = []

    constructor() {
        this.getIds()
    }

    async getIds() {
        this.ids = (await getDoc(categoryIdsRef)).data()?.ids as string[] || ['testerer']
        console.log('Category ids: ', this.ids)
    }

    

    async seach(seach: string) {
        const FoundIds = this.getSimilarIds(seach)
        const categories: CatergoryDocument[] = []
        const MaxCategories = 10

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
        console.log('Seach: ', seach)
        console.log('Description: ', description)
    
        setDoc(doc(categoryRef, seach), {
            name: seach,
            description: description,
            count: 0
        })

        setDoc(categoryIdsRef, {
            ids: [seach]
        }, { merge: true })

        this.ids.push(seach)
    
        console.log('Category created')

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