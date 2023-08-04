import { Timestamp } from "firebase/firestore"

type BuildDocument = {
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

type ImageDocument = {
    buildId: string
    links: string[]
}

type InventoryDocument = {
    buildId: string
    block: string
    count: number
}

type CategoryDocument = {
    buildId: string
    category: string
}

export {
    BuildDocument,
    ImageDocument,
    InventoryDocument,
    CategoryDocument,
}