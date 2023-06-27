import {
    BuildDocument,
    BuildInventory
} from '@/assets/scripts/useTypes'
import { Timestamp } from 'firebase/firestore'

import { doc } from 'firebase/firestore'
import { ref as fbRef, getDownloadURL } from 'firebase/storage'

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
        try {
            await getDoc(doc(buildRef, buildId)).then((data) => {
                if (data.exists()) {
                    buildData.value = data.data() as BuildDocument
                    console.log(buildData.value)
                }
            })
            checkFavoriteState(buildId)

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function updateBuildDoc(buildId: string, newDocData: any) {
        await updateDoc(doc(buildRef, buildId), newDocData)
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
        try {
            const inventoryQuery = query(inventoryRef, where('buildId', '==', buildId))
            await getDocs(inventoryQuery).then((querySnapshot) => {
                querySnapshot.forEach((data) => {
                    console.log(data.data())
                    buildInventory.value.push({
                        amount: data.data().count,
                        block_name: data.data().block,
                        block_image: '/blocks/' + data.data().block.split(':')[1] + '.png',
                    })
                })
            })

            return true
        } catch (error) {
            console.log(error)
            return false
        }
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

    async function getImages(buildId: string) {
        try {
          const storageRef = fbRef(storage, `/builds/${buildData.value.userId}/${buildId}/images`)
    
            for(let i = 0; i < buildData.value.images; i++) {
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
        
            changeShownImage(buildData.value.thumbnailIndex)  
            return true
        } catch (error) {
            console.log(error)
            return false
        }
        
    }

    function changeShownImage(index: number){
        buildImages.value.forEach((item) => {
            item.current = false
        })
        buildImages.value[index].current = true
        currentImage.value = buildImages.value[index].image
    }

    async function checkFavoriteState(userId:string) {
        buildFavorite.value = (await getDoc(doc(favoriteRef, `${buildData.value.buildId}:${userId}`))).exists()
    }

    async function addFavorite(userId:string) {
        await setDoc(doc(favoriteRef, `${buildData.value.buildId}:${userId}`), {
            buildId: buildData.value.buildId,
            userId: userId
        })

        buildFavorite.value = true
    }

    async function removeFavorite(userId:string) {
        await deleteDoc(doc(favoriteRef, `${buildData.value.buildId}:${userId}`))
        buildFavorite.value = false
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

        checkFavoriteState,
        addFavorite,
        removeFavorite
    }
}