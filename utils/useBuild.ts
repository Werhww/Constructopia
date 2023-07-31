import {
    BuildDocument,
    ImageDocument,
    InventoryDocument
} from './useTypes'

type BuildDataDoc = Omit<BuildDocument, 'buildId'>

export async function getBuildDoc(buildId: string) {
    try {
        let docData: BuildDocument

        const buildDocumentData = await getDoc(doc(buildRef, buildId))

        if (buildDocumentData.exists()) {
            docData = {
                buildId: buildDocumentData.id,
                ...buildDocumentData.data() as BuildDataDoc 
            }
            return docData as BuildDocument
        } else {
            throw new Error('Build document does not exist')
        }

    } catch {
        throw new Error('Build document does not exist')
    }
}

export async function getBuildInventory(buildId: string) {
    try {
        let buildInventory: InventoryDocument[] = []

        const inventoryQuery = query(inventoryRef, where('buildId', '==', buildId))
        await getDocs(inventoryQuery).then((querySnapshot) => {
            if(querySnapshot.empty) {
                throw new Error('No inventory found')
            } else {
                querySnapshot.forEach((data) => {
                    buildInventory.push({
                        buildId: data.data().buildId,
                        count: data.data().count,
                        block: data.data().block
                    })
                })
            }
        })

        return buildInventory
    } catch {
        throw new Error('Error getting build inventory')
    }
}

export async function getImages(buildId: string) {
    try {
        const imageQuery = query(imageRef, where('buildId', '==', buildId))
        const imageData = await getDocs(imageQuery)

        if(imageData.empty) {
            throw new Error('No images found')
        } else {
            return imageData.docs[0].data() as ImageDocument
        }

    } catch {
        throw new Error('Error getting images')
    }
}

export async function checkFavoriteState(buildId: string) {
    try {
        const favoriteQuery = query(favoriteRef, where('buildId', '==', buildId))
        const favoriteData = await getDocs(favoriteQuery)

        if(favoriteData.empty) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error checking favorite state')
    }
}

export async function deleteBuild(buildId: string) {
    try {
        const allRelatedDocs = await getAllRelatedDocs(buildId)

        allRelatedDocs.forEach((docRef) => {
            console.log(docRef)
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

        return
    } catch (error) {
        console.log(error)
        throw new Error('Error deleting build')
    }
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
    await deleteDoc(doc(col, docRef)).catch(() => {
        throw new Error('Error deleting document')
    })
}

async function removeThisFile(fileRef: string) {
    await deleteObject(fbRef(storage, fileRef)).catch(() => {
        throw new Error('Error deleting file')
    })
}