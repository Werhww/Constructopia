import { Timestamp } from "firebase/firestore"

interface BuildDocumentWithoutCreatedDate {
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
        lastEdit: any
    }
}

interface BuildDocument extends BuildDocumentWithoutCreatedDate {
    date: {
        lastEdit: Timestamp
        created: Timestamp
    }
}

interface ImageDocument {
    docId: string
    buildId: string
    links: string[]
}

interface InventoryDocument {
    docId: string
    buildId: string
    block: string
    count: number
}

interface InventoryItemFixedForRows extends InventoryDocument {
    stack: boolean
} /* For inventory components */

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

type InitalUpdateBuildData = Omit<BuildDocumentWithoutCreatedDate, 'buildId' | 'userId' | 'username' | 'views' | 'blocks' | 'date'> 
type FinalUpdateBuildData = InitalUpdateBuildData & Pick<BuildDocumentWithoutCreatedDate, 'date'>

type DifficultyKeys = 'all' | 'easy' | 'medium' | 'hard' | 'expert' | 'nightmare'
type OrderKeys = 'views' | 'blocks' | 'modified' | 'created'

type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};

export {
    FinalUpdateBuildData,
    InitalUpdateBuildData,
    BuildDocument,
    ImageDocument,
    InventoryDocument,
    InventoryItemFixedForRows,
    CategoryDocument,
    DifficultyKeys,
    OrderKeys,
    Prettify,

    PreviewBuildData,
    BuildData
}