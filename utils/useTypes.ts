import { Timestamp } from "firebase/firestore"

interface BuildDocument {
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
        created: Timestamp
        lastEdit: Timestamp
    }
}

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

type DifficultyKeys = 'all' | 'easy' | 'medium' | 'hard' | 'expert' | 'nightmare'
type OrderKeys = 'views' | 'blocks' | 'modified' | 'created'

type Prettify<T> = {
   [K in keyof T]: T[K];
} & {};

export {
    BuildDocument,
    ImageDocument,
    InventoryDocument,
    CategoryDocument,
    DifficultyKeys,
    OrderKeys,
    Prettify
}