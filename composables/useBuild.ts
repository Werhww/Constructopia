import {
    BuildDocument,
    BuildInventory
} from '@/assets/scripts/useTypes'
import { Timestamp } from 'firebase/firestore'


export function useBuild() {
    const buildFavorite = ref<boolean>(false)

    const buildData = ref<BuildDocument>({
        title: '',
        description: '',
        difficulty: '',
        blocks: 0,
        images: 0,
        thumbnailIndex: 0,
        views: 0,
        date: {
            created: Timestamp.now(),
            lastEdited: Timestamp.now()
        },
        user: '',
        userId: ''
    })
    const buildInventory = ref<BuildInventory[]>([])

    const currentImage = ref<string>('')
    const buildImages = ref<{
        image:string
        current:boolean
        index:number
    }[]>([])

    /* Build doc functions */
    async function getBuildDoc(buildId: string) {
        getDoc(doc(buildRef, buildId)).then((doc) => {
            if (doc.exists()) {
                buildData.value = doc.data() as BuildDocument
                return '200'
            } else {
                return '404'
            }
        }).catch((error) => {
            console.log("Error getting document:", error)
            return '500'
        })
    }

    async function updateBuildDoc(buildId: string, newDocData: BuildDocument) {
        updateDoc(doc(buildRef, buildId), newDocData).then(() => {
            return '200'
        }).catch((error) => {
            console.log("Error updating document:", error)
            return '500'
        })
    }

    async function deleteBuildDoc(buildId: string) {
        deleteDoc(doc(buildRef, buildId)).then(() => {
            deleteBuildInventory(buildId)
            return '200'
        }).catch((error) => {
            console.log("Error deleting document:", error)
            return '500'
        })

        
    }
    
    async function getBuildInventory(buildId: string) {
        const inventoryQuery = query(inventoryRef, where('buildId', '==', buildId), orderBy('count', 'desc'))
        getDocs(inventoryQuery).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                buildInventory.value.push(doc.data() as any)
            })
        }).catch((error) => {
            console.log("Error getting document:", error)
            return '500'
        })
        
    }

    async function deleteBuildInventory(buildId: string) {
        const inventoryQuery = query(inventoryRef, where('buildId', '==', buildId), orderBy('count', 'desc'))
        getDocs(inventoryQuery).then((querySnapshot) => {
            querySnapshot.forEach((data) => {
                deleteDoc(doc(db, 'inventory', data.id) ).then(() => {
                    return '200'
                }).catch((error) => {
                    console.log("Error deleting document:", error)
                    return '500'
                })
            })
        }).catch((error) => {
            console.log("Error getting document:", error)
            return '500'
        })
    }

    async function getImages(userId: string, buildId: string, images: number, thumbnailIndex: number) {
        const storageRef = fbRef(storage, `/builds/${userId}/${buildId}/images`)
    
    
        for(let i = 0; i < images; i++) {
            const imageRef = fbRef(storageRef, `${i}.png`)
            let imageUrl = ""
    
            await getDownloadURL(imageRef).then((url) => {
                imageUrl = url
            }).catch((error) => {
                console.log(error)
            })
            
            buildImages.value.push({
                image: imageUrl,
                current: false,
                index: i
            })
        }
    
        changeShownImage(thumbnailIndex)
    }

    function changeShownImage(index: number){
        buildImages.value.forEach((item) => {
            item.current = false
        })
        buildImages.value[index].current = true
        currentImage.value = buildImages.value[index].image
    }

    async function checkFavoriteState(userId:string) {

    }

    async function addFavorite(userId:string) {
        
    }

    return {
        buildData,
        buildInventory,
        buildImages,
        currentImage,
        buildFavorite,

        getBuildDoc,
        updateBuildDoc,
        deleteBuildDoc,

        getBuildInventory,

        getImages,
        changeShownImage,
    }
}