import {
    UpdateBuildData,
    PreviewBuildData,
    BuildData,
    DifficultyKeys,
    OrderKeys,
    Prettify
} from "~/utils/useTypes"

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

    constructor(private buildId: string, private userId: string) {}

    async getBuild() {
        const buildDoc = await getBuildDoc(this.buildId)

        this.BuildOwnerId = buildDoc.userId
        return {
            build: buildDoc,
            images: await getImages(this.buildId),
            inventory: await getBuildInventory(this.buildId),
            favorite: (await checkFavoriteState(this.userId, this.buildId)).state,
            owner: this.userId === this.BuildOwnerId
        }
    }

    async updateFavoriteState() {
        return await updateFavorite(this.userId, this.buildId)
    }

    async saveBuild(newData:UpdateBuildData) {
        if(this.userId !== this.BuildOwnerId) throw new Error('User is not owner of this build')
        return await saveNewBuildData(this.buildId, newData)
    }    

    async deleteBuild() {
        if(this.userId !== this.BuildOwnerId) throw new Error('User is not owner of this build')
        await deleteBuild(this.buildId, this.userId)
    }
}