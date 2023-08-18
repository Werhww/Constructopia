import {
    BuildDocument,
    InventoryDocument,
    FinalUpdateBuildData,
    Prettify,
} from './useTypes'

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
    const inventory = await getDocs(collection(buildRef, buildId, 'inventory'))
    if (inventory.empty) throw new Error('No inventory found')

    inventory.docs.forEach((data) => {
        buildInventory.push({
            docId: data.id,
            count: data.data().count,
            block: data.data().block
        })
    })

    return buildInventory 
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

    if(!oldStatus.state) {
        console.log('Adding favorite')
        setDoc(doc(favoriteRef, `${userId}-${buildId}`), {
            userId: userId,
            buildId: buildId,
        })
    }
    return false
}


export function deleteBuild(BuildDoc: BuildDocument, InventoryDocuments: InventoryDocument[]) {
    const { buildId, userId, imageIds, litematicId } = BuildDoc

    
    removeThisDoc(buildId, buildRef) /* Removes build Doc */
    removeThisFile(`user/${userId}/litematic/${litematicId}.litematic`) /* Removes litematic file */
    
    const AmountOfImages = BuildDoc.links.length
    for(let i = 0; i < AmountOfImages; i++) {
        console.log('deleteing image ', i)
        removeThisFile(`users/${userId}/images/${imageIds[i]}.png`)
    }

    for(let i = 0; i < InventoryDocuments.length; i++) {
        console.log('deleteing inventory ', i)
        removeThisDoc(InventoryDocuments[i].docId, doc(buildRef, buildId, 'inventory', InventoryDocuments[i].docId))
    }

    console.log('done deleting build')

}

function removeThisDoc(docRef: string, col: any) {
    console.log(col)
    deleteDoc(doc(col, docRef))
}

function removeThisFile(fileRef: string) {
    console.log(fileRef)
    deleteObject(fbRef(storage, fileRef))
}

export async function saveNewBuildData(buildId: string, buildData: Prettify<FinalUpdateBuildData>) {
    await setDoc(doc(buildRef, buildId), buildData, { merge: true }).catch(() => {
        throw new Error('Error saving build data')
    })

    return 200
}