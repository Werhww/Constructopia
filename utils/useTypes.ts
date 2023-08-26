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
        lastEdit: Timestamp
    }

    litematicId: string
    litematic: string
    
    categorys: string[]

    imageIds: string[]
    links: string[]
}

interface BuildDocument extends BuildDocumentWithoutCreatedDate {
    date: {
        lastEdit: Timestamp
        created: Timestamp
    }
}

interface FullBuildDataSet {
    build: BuildDocument
    inventory: InventoryDocument[]
    favorite: boolean
    owner: boolean
}

interface CategoryIdDocument {
    ids: string[]
}

interface CatergoryDocument {
    id:string 
    name: string
    count: number
    description: string
}

interface InventoryDocument {
    docId: string
    block: string
    count: number
}

interface InventoryItemFixedForRows extends InventoryDocument {
    stack: boolean
} /* For inventory components */

type InitalUpdateBuildData = Omit<BuildDocumentWithoutCreatedDate, 'buildId' | 'userId' | 'username' | 'views' | 'blocks' | 'date' | 'links' | 'categorys' | 'imageIds' | 'litematic' | 'litematicId'> 
type FinalUpdateBuildData = InitalUpdateBuildData & Pick<BuildDocumentWithoutCreatedDate, 'date'>

type DifficultyKeys = 'all' | 'easy' | 'medium' | 'hard' | 'expert' | 'nightmare'
type OrderKeys = 'views' | 'blocks' | 'modified' | 'created'

type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};




export {
    BuildDocument,
    FullBuildDataSet,
    InventoryDocument,
    InventoryItemFixedForRows,

    CatergoryDocument,
    CategoryIdDocument,
    DifficultyKeys,
    OrderKeys,

    InitalUpdateBuildData,
    FinalUpdateBuildData,

    Prettify
}