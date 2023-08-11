import {
    BuildDocument,
    ImageDocument,
    InventoryDocument,
    Prettify
} from './useTypes'
import { DocumentData, Query } from '@firebase/firestore'

type BuildDataDoc = Omit<BuildDocument, 'buildId'>

export async function getBuildDoc(buildId: string) {
    const buildDocumentData = await getDoc(doc(buildRef, buildId))
    if (!buildDocumentData.exists()) throw new Error('Build document does not exist')

    return {
        buildId: buildDocumentData.id,
        ...buildDocumentData.data()
    } as Prettify<BuildDocument>
}

export async function getBuildInventory(buildId: string) {
    let buildInventory: Prettify<InventoryDocument>[] = []

    const inventoryQuery = query(inventoryRef, where('buildId', '==', buildId))
    const inventory = await getDocs(inventoryQuery)
    if (inventory.empty) throw new Error('No inventory found')

    inventory.docs.forEach((data) => {
        buildInventory.push({
            buildId: data.data().buildId,
            count: data.data().count,
            block: data.data().block
        })
    })

    return buildInventory 
}

export async function getImages(buildId: string) {
    const imageQuery = query(imageRef, where('buildId', '==', buildId))
    const imageData = await getDocs(imageQuery)

    if(imageData.empty) throw new Error('No images found')

    return imageData.docs[0].data() as Prettify<ImageDocument>
}

export async function checkFavoriteState(buildId: string) {
    const favoriteQuery = query(favoriteRef, where('buildId', '==', buildId))
    const favoriteData = await getDocs(favoriteQuery)

    if(favoriteData.empty) return false
    else return true
}

export function updateFavorite(userId:string, buildId: string, status: boolean) {
    if(status == true) {
        setDoc(doc(favoriteRef, `${userId}-${buildId}`), {
            userId: userId,
            buildId: buildId,
        })
    } else {
        deleteDoc(doc(favoriteRef, `${userId}-${buildId}`))
    }
}

export async function deleteBuild(buildId: string) {
    const allRelatedDocs = await getAllRelatedDocs(buildId)

    allRelatedDocs.forEach((docRef) => {
        deleteDoc(doc(db, docRef.collection, docRef.docId))
    })

    /* auth.currentUser?.uid */
    const AmountOfImages = 6

    for(let i = 0; i < AmountOfImages; i++) {
        try {
            await removeThisFile(`images/${'1234test'}/${buildId}/${i}.png`)
        } catch {
            break
        }
    }
    
    removeThisFile(`litematic/${'1234test'}/${buildId}/build.litematic`)
    removeThisDoc(buildId, buildRef)

    return 200
}

async function getAllRelatedDocs(buildId: string) {
    let allIds: {
        docId: string,
        collection: string
    }[] = []

    const collections = ['images', 'inventory']

    const docQuerys = collections.map((col) => {
        return {
            query: query(collection(db, col), where('buildId', '==', buildId)),
            collection: col
        }
    })

    for(let i = 0; i < docQuerys.length; i++) {
        const docs = await getDocs(docQuerys[i].query)

        docs.forEach((doc) => {
            allIds.push({
                docId: doc.id,
                collection: docQuerys[i].collection
            })
        })
    }

    return allIds
}

async function removeThisDoc(docRef: string, col: any) {
    const Deleted = await deleteDoc(doc(col, docRef)).catch(() => {
        throw new Error('Error deleting document')
    })

    return 200
}

async function removeThisFile(fileRef: string) {
    await deleteObject(fbRef(storage, fileRef)).catch(() => {
        throw new Error('Error deleting file')
    })

    return 200
}

/* List getters */
export async function getBuildListByUserId (userId:string) {
    const buildQuery = query(buildRef, where('userId', '==', userId), orderBy('views', 'desc'))

    return await getBuildList(buildQuery)
}

export async function getBuildListByCategory (userId:string, category:string) {
    const buildQuery = query(buildRef, limit(10))

    return await getBuildList(buildQuery)
}

export async function getBuildList( listQuery: Query<DocumentData, DocumentData> ) {
    const buildList:{
        build:  BuildDocument,
        images: ImageDocument
    }[] = []

    const buildData = await getDocs(listQuery)

    for (const doc of buildData.docs) {
        const images = await getImages(doc.id)

        buildList.push({
            build: {
                buildId: doc.id,
                ...doc.data() as BuildDataDoc
            },
            images: images
        })
    }

    return buildList
}

/* Not finished */
export async function getBuildListBySearch (userId:string, search:string) {

}
