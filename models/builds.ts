import { BuildDocument, CategoryDocument, ImageDocument, InventoryDocument, Prettify, DifficultyKeys } from "~/utils/useTypes"

interface PreviewBuildData {
    build: Prettify<BuildDocument>,
    images: Prettify<ImageDocument>
}

interface BuildData extends PreviewBuildData {
    inventory: Prettify<InventoryDocument>[],
    categories?: Prettify<CategoryDocument>[],
    favorite: boolean
}

type OrderKeys = 'views' | 'blocks' | 'modified' | 'created'

export class User {
    private OriginalBuilds: Prettify<PreviewBuildData>[] = []
    private CurrentBuilds: Prettify<PreviewBuildData>[] = []
    public OpenBuild?: Prettify<BuildData>

    constructor(private userId: string) {}

    async getBuilds() {
        this.OriginalBuilds = await getBuildListByUserId(this.userId)
        this.CurrentBuilds = this.OriginalBuilds
        return this.OriginalBuilds
    }

    async getBuild(buildId: string) {
        let buildData: Prettify<BuildData> | undefined

        for(let i = 0; i < this.OriginalBuilds!.length; i++) {
            if(this.OriginalBuilds![i].build.buildId === buildId) {
                buildData = {
                    ...this.OriginalBuilds![i],
                    inventory: await getBuildInventory(buildId),
                    favorite: await checkFavoriteState(buildId)
                }
                break
            }
        }

        return this.OpenBuild = buildData
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