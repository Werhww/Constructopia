import {
    BuildDocument,
    ImageDocument,
    InventoryDocument,
    PreviewBuildData,
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

    const inventoryQuery = query(inventoryRef, where('buildId', '==', buildId))
    const inventory = await getDocs(inventoryQuery)
    if (inventory.empty) throw new Error('No inventory found')

    inventory.docs.forEach((data) => {
        buildInventory.push({
            docId: data.id,
            buildId: data.data().buildId,
            count: data.data().count,
            block: data.data().block
        })
    })

    return buildInventory 
}

export async function getImages(buildId: string):Promise<Prettify<ImageDocument>> {
    const imageQuery = query(imageRef, where('buildId', '==', buildId))
    const imageData = await getDocs(imageQuery)

    if(imageData.empty) throw new Error('No images found')

    return {
        docId: imageData.docs[0].id,
        ...imageData.docs[0].data()
    } as Prettify<ImageDocument>
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



export function deleteBuild(BuildDoc: BuildDocument, ImageDocument: ImageDocument, InventoryDocuments: InventoryDocument[]) {
    const { buildId, userId } = BuildDoc
    
    removeThisDoc(buildId, buildRef) /* Removes build Doc */
    removeThisDoc(ImageDocument.docId, imageRef) /* Removes image Doc */
    removeThisFile(`litematic/${userId}/${buildId}/build.litematic`) /* Removes litematic file */
    
    const AmountOfImages = ImageDocument.links.length
    for(let i = 0; i < AmountOfImages; i++) {
        console.log(`images/${userId}/${buildId}/${i}.png`)
        removeThisFile(`images/${userId}/${buildId}/${i}.png`)
    }

    for(let i = 0; i < InventoryDocuments.length; i++) {
        console.log(InventoryDocuments[i].docId)
        removeThisDoc(InventoryDocuments[i].docId, inventoryRef)
    }

    return 200
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