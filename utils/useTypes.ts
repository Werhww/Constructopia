import { Timestamp } from "firebase/firestore"

interface BuildDocumentWithoutDate {
    buildId: string

    userId: string
    username: string

    thumbnailIndex: number

    title: string
    description: string
    difficulty: string
    blocks: number

    views: number

    date: {
        lastEdit: Timestamp
    }
}

type BuildDocument = BuildDocumentWithoutDate & {date: {created: Timestamp}}

interface ImageDocument {
    buildId: string
    links: string[]
}

interface InventoryDocument {
    buildId: string
    block: string
    count: number
}

interface CategoryDocument {
    buildId: string
    category: string
}

interface PreviewBuildData {
    build: Prettify<BuildDocument>
    images: Prettify<ImageDocument>
    favorite: boolean
}

interface BuildData extends PreviewBuildData {
    inventory: Prettify<InventoryDocument>[]
    categories?: Prettify<CategoryDocument>[]
}

type UpdateBuildData = Omit<BuildDocumentWithoutDate, 'buildId' | 'userId' | 'username' | 'views' | 'blocks'> 


type DifficultyKeys = 'all' | 'easy' | 'medium' | 'hard' | 'expert' | 'nightmare'
type OrderKeys = 'views' | 'blocks' | 'modified' | 'created'

type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};

export {
    UpdateBuildData,
    BuildDocument,
    ImageDocument,
    InventoryDocument,
    CategoryDocument,
    DifficultyKeys,
    OrderKeys,
    Prettify,

    PreviewBuildData,
    BuildData
}