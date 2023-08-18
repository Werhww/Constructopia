import {
    BuildDocument,
    ImageDocument,
    InventoryDocument,
    PreviewBuildData,
    FinalUpdateBuildData,
    Prettify,
} from './useTypes'
import { DocumentData, Query } from '@firebase/firestore'

import CardDataWorker from '@/assets/workers/CardDataWorker?worker'
import BuildListWorker from '@/assets/workers/BuildListWorker?worker'

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

export async function checkFavoriteState(userId:string, buildId: string) {
    const favoriteData = await getDoc(doc(favoriteRef, `${userId}-${buildId}`))

    return {
        state: favoriteData.exists(),
        ref: favoriteData.ref
    }
}

export async function updateFavorite(userId:string, buildId: string) {
    const oldStatus = await checkFavoriteState(userId, buildId)

    console.log(oldStatus)
    return false
}

export async function deleteBuild(buildId: string, userId: string) {
    const allRelatedDocs = await getAllRelatedDocs(buildId)

    allRelatedDocs.forEach((docRef) => {
        deleteDoc(doc(db, docRef.collection, docRef.docId))
    })

    const AmountOfImages = 6

    for(let i = 0; i < AmountOfImages; i++) {
        try {
            await removeThisFile(`images/${userId}/${buildId}/${i}.png`)
        } catch {
            break
        }
    }
    
    removeThisFile(`litematic/${userId}/${buildId}/build.litematic`)
    removeThisDoc(buildId, buildRef)

    return 200
}

async function getAllRelatedDocs(buildId: string) {
    let allIds: {
        docId: string,
        collection: string
    }[] = []

    const collections = ['images', 'inventory', 'categories']

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
    await deleteDoc(doc(col, docRef)).catch(() => {
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

export async function saveNewBuildData(buildId: string, buildData: Prettify<FinalUpdateBuildData>) {
    await setDoc(doc(buildRef, buildId), buildData, { merge: true }).catch(() => {
        throw new Error('Error saving build data')
    })

    return 200
}

/* List getters */
export async function getBuildListByUserId (userId:string) {
    const buildQuery = query(buildRef, where('userId', '==', userId), orderBy('views', 'desc'))

    return await getBuildList(buildQuery, userId)
}

export async function getBuildListByCategory (userId:string, category?:string) {
    const buildQuery = query(buildRef, limit(10))

    return await getBuildList(buildQuery, userId)
}

export async function getBuildList( listQuery: Query<DocumentData, DocumentData>, userId:string ) {
    return new Promise<PreviewBuildData[]>(async (resolve, reject) => {
        const worker = new BuildListWorker()
        const query = JSON.parse(JSON.stringify(listQuery))
        worker.postMessage([query, userId])
        
        worker.onmessage = function(e) {
            resolve(e.data)
        }
    })
}

/* Not finished */
export async function getBuildListBySearch (userId:string, search:string) {

}
