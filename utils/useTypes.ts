import { Timestamp } from '@firebase/firestore-types'

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
        created: any
        lastEdit: any
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

export {
    BuildDocument,
    ImageDocument,
    InventoryDocument
}