import { buildRef } from "assets/scripts/firebase"
import { Timestamp, collection, doc, getDoc, increment, setDoc } from "firebase/firestore"
import {
    InitalUpdateBuildData,
    DifficultyKeys,
    OrderKeys,
    Prettify,

    BuildDocument,
    InventoryDocument,
    FullBuildDataSet,
} from "~/utils/useTypes"

export class User {
    private OriginalBuilds: Prettify<BuildDocument>[] = []
    private CurrentBuilds: Prettify<BuildDocument>[] = []
    private MetaData: {
        BuildAmount: number,
        MinecraftName: string,
        MostViewedBuild: Prettify<BuildDocument>,
    } = {} as any

    constructor(private userId: string) {}

    async getBuilds() {
        this.OriginalBuilds = await getBuildListByUserId(this.userId)
        this.CurrentBuilds = this.OriginalBuilds
        return this.OriginalBuilds
    }

    async getMetaData(){
        this.MetaData = {
            BuildAmount: this.OriginalBuilds.length,
            MinecraftName: this.OriginalBuilds[0].username,
            MostViewedBuild: this.OriginalBuilds.sort((a, b) => b.views - a.views)[0],
        }
        return this.MetaData
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
        if(key == 'modified') return [...this.CurrentBuilds].sort((a, b) => a.date.lastEdit.seconds - b.date.lastEdit.seconds)
        if(key == 'created') return [...this.CurrentBuilds].sort((a, b) => a.date.created.seconds - b.date.created.seconds)
        return [...this.CurrentBuilds].sort((a, b) => a[key] - b[key])
    }

    private listSortAsc(key:OrderKeys) {
        if(key == 'modified') return [...this.CurrentBuilds].sort((a, b) => b.date.lastEdit.seconds - a.date.lastEdit.seconds)
        if(key == 'created') return [...this.CurrentBuilds].sort((a, b) => b.date.created.seconds - a.date.created.seconds)
        return [...this.CurrentBuilds].sort((a, b) => b[key] - a[key])
    }

    filterByDifficulty(difficulty:DifficultyKeys) {
        this.CurrentBuilds = [...this.OriginalBuilds].filter((build) => build.difficulty === difficulty)
        if (difficulty === 'all') this.CurrentBuilds = this.OriginalBuilds
        return this.CurrentBuilds
    }


}

export class UserBuild {
    private BuildOwnerId:string = 'noIdYetttt'
    private BuildDoc: BuildDocument = {} as BuildDocument
    private InventoryDocs: InventoryDocument[] = []

    constructor(private buildId: string, private userId: string | undefined) {}

    async getBuild(): Promise<FullBuildDataSet> {
        this.BuildDoc = await getBuildDoc(this.buildId)
        this.BuildOwnerId = this.BuildDoc.userId
        this.InventoryDocs = await getBuildInventory(this.buildId)
        let favorite = false
        if(this.userId) {
            favorite = (await checkFavoriteState(this.userId, this.buildId)).state
        }

        return {
            build: this.BuildDoc,
            inventory: this.InventoryDocs,
            favorite: favorite,
            owner: this.userId === this.BuildDoc.userId
        }
    }

    updateFavoriteState() {
        if(this.userId == undefined) return
        return updateFavorite(this.userId, this.buildId)
    }

    async saveBuild(newData:Prettify<InitalUpdateBuildData>) {
        const NewDataWithDate = {
            ...newData,
            date: {
                lastEdit: Timestamp.now(),
            }
        }

        if(this.userId !== this.BuildOwnerId) throw new Error('User is not owner of this build')
        return await saveNewBuildData(this.buildId, NewDataWithDate)
    }    

    deleteBuild() {
        if(this.userId !== this.BuildOwnerId) throw new Error('User is not owner of this build')
        deleteBuild(this.BuildDoc, this.InventoryDocs)
        return this.BuildOwnerId
    }

    async checkIfViewed() {
        const uid = checkUIDCookie()
        const viewRef = collection(buildRef, this.BuildDoc.buildId, "views")
        const favoriteData = await getDoc(doc(viewRef, uid))
        if(favoriteData.exists()) return
        this.addViewCount(uid)
    }

    private addViewCount(uid:string) {
        const viewRef = collection(buildRef, this.BuildDoc.buildId, "views")
        setDoc(doc(viewRef, uid), {user:uid})
        setDoc(doc(buildRef, this.BuildDoc.buildId), {views: increment(1)}, {merge:true})
    }
}