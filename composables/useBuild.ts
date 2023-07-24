import {
    BuildDocument,
    BuildInventory
} from '@/assets/scripts/useTypes'
import { count } from 'console'
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

    const buildLoadStates = ref({
        buildDoc: false,
        buildInventory: false,
        buildImages: false,
    })

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

            buildLoadStates.value.buildDoc = true
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

            buildLoadStates.value.buildInventory = true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function deleteBuildInventory(buildId: string) {
        const inventoryQuery = query(inventoryRef, where('buildId', '==', buildId), orderBy('count', 'desc'))
        await getDocs(inventoryQuery).then((querySnapshot) => {
            querySnapshot.forEach((data) => {
                deleteDoc(doc(db, 'inventory', data.id))
            })
        })
    }

    async function getImages(buildId: string) {
        const imageQuery = query(imageRef, where('buildId', '==', buildId))
        const imageData = (await getDocs(imageQuery)).docs[0].data()

        for(let i = 0; i < imageData.links.length; i++) {
            const image = imageData.links[i] 

            if(i == buildData.value.thumbnailIndex) {
                currentImage.value = image
                buildImages.value.push({
                    image: image,
                    current: true,
                    index: i
                })
            } else {
                buildImages.value.push({
                    image: image,
                    current: false,
                    index: i
                })
            }
        }

        changeShownImage(buildData.value.thumbnailIndex)  
        buildLoadStates.value.buildImages = true
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
        buildLoadStates,

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