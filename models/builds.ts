import {
    InitalUpdateBuildData,
    PreviewBuildData,
    DifficultyKeys,
    OrderKeys,
    Prettify,

    BuildDocument,
    ImageDocument,
    InventoryDocument,
} from "~/utils/useTypes"

import { serverTimestamp } from "firebase/firestore"

export class User {
    private OriginalBuilds: Prettify<PreviewBuildData>[] = []
    private CurrentBuilds: Prettify<PreviewBuildData>[] = []

    constructor(private userId: string) {}

    async getBuilds() {
        this.OriginalBuilds = await getBuildListByUserId(this.userId)
        this.CurrentBuilds = this.OriginalBuilds
        return this.OriginalBuilds
    }

    /* Builds List Ordering and Filtering */
    reverseBuildList() {
        this.CurrentBuilds = [...this.CurrentBuilds].reverse()
        return this.CurrentBuilds
    }

    changeListOrder(orderKey:OrderKeys, direction:string) {
        if(direction === 'desc') this.CurrentBuilds = this.listSortDesc(orderKey)
        else this.CurrentBuilds = this.listSortAsc(orderKey)
        return this.CurrentBuilds
    }

    private listSortDesc(key:OrderKeys) {
        if(key == 'modified') return [...this.CurrentBuilds].sort((a, b) => a.build.date.lastEdit.seconds - b.build.date.lastEdit.seconds)
        if(key == 'created') return [...this.CurrentBuilds].sort((a, b) => a.build.date.created.seconds - b.build.date.created.seconds)
        return [...this.CurrentBuilds].sort((a, b) => a.build[key] - b.build[key])
    }

    private listSortAsc(key:OrderKeys) {
        if(key == 'modified') return [...this.CurrentBuilds].sort((a, b) => b.build.date.lastEdit.seconds - a.build.date.lastEdit.seconds)
        if(key == 'created') return [...this.CurrentBuilds].sort((a, b) => b.build.date.created.seconds - a.build.date.created.seconds)
        return [...this.CurrentBuilds].sort((a, b) => b.build[key] - a.build[key])
    }

    filterByDifficulty(difficulty:DifficultyKeys) {
        this.CurrentBuilds = [...this.OriginalBuilds].filter((build) => build.build.difficulty === difficulty)
        if (difficulty === 'all') this.CurrentBuilds = this.OriginalBuilds
        return this.CurrentBuilds
    }

}

export class UserBuild {
    private BuildOwnerId:string = 'noIdYetttt'
    private BuildDoc: BuildDocument = {} as BuildDocument
    private ImagesDoc: ImageDocument = {} as ImageDocument
    private InventoryDocs: InventoryDocument[] = []

    constructor(private buildId: string, private userId: string) {}

    async getBuild() {
        this.BuildDoc = await getBuildDoc(this.buildId)
        this.BuildOwnerId = this.BuildDoc.userId
        this.ImagesDoc = await getImages(this.buildId)
        this.InventoryDocs = await getBuildInventory(this.buildId)

        return {
            build: this.BuildDoc,
            images: this.ImagesDoc,
            inventory: this.InventoryDocs,
            favorite: (await checkFavoriteState(this.userId, this.buildId)).state,
            owner: this.userId === this.BuildDoc.userId
        }
    }

    updateFavoriteState() {
        return updateFavorite(this.userId, this.buildId)
    }

    async saveBuild(newData:Prettify<InitalUpdateBuildData>) {
        const NewDataWithDate = {
            ...newData,
            date: {
                lastEdit: serverTimestamp(),
            }
        }

        if(this.userId !== this.BuildOwnerId) throw new Error('User is not owner of this build')
        return await saveNewBuildData(this.buildId, NewDataWithDate)
    }    

    deleteBuild() {
        if(this.userId !== this.BuildOwnerId) throw new Error('User is not owner of this build')
        deleteBuild(this.BuildDoc, this.ImagesDoc, this.InventoryDocs)
        return this.BuildOwnerId
    }
}