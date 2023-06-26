import { Timestamp } from '@firebase/firestore-types'

interface BuildDocument {
    buildId?: string

    userId: string
    user: string

    thumbnailIndex: number
    images: number

    title: string
    description: string
    difficulty: string

    blocks: number
    views: number

    date: {
        created: Timestamp
        lastEdited: Timestamp
    }
}

interface BuildInventory {
    amount: number
    block_image: string
    block_name: string
}

export type {
    BuildDocument,
    BuildInventory      
}