

export class Category {
    private ids: string[] = []

    constructor() {
        this.getIds()
    }

    async getIds() {
        this.ids = (await getDoc(categoryIdsRef)).data()?.ids as string[]
    }

    seach(seach: string) {
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

}