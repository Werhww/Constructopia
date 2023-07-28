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