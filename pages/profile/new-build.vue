<template>
<section>
    <div class="new-build">
        <ComponentImageImport v-on:image-imported="asignImages" v-on:update-main-image="asignThumbnail" :disabled="isButtonsDisabled"/>
        <div class="build-details">
            <ComponentInput v-model="title" :disabled="isButtonsDisabled" class="build-title" placeholder="title" font_size="2.5rem" width="100%" :maxlength="35"/>
            <div class="build-undertitel">
                <BuildOpenDifficulty v-model="difficulty" :white="true" :disabled="isButtonsDisabled" /> 
                <ComponentLitematicImport v-on:litematic-imported="asignLitematic" :disabled="isButtonsDisabled" />
                <div v-if="isLitematicImported" class="build-open-3d">
                    <img src="/icons/build/3d-icon-inverted.svg">
                    <p>open 3d editor</p>
                </div>
            </div>
            <textarea v-model="description" :disabled="isButtonsDisabled" rows="18" maxlength="350" placeholder="description...." class="edit-input edit-description"></textarea>
        </div>
    </div>
    <div class="buttons">
        <ComponentButton :disabled="isButtonsDisabled" @click="router.back()" label="cancel" bg_color="var(--inventory-item-background)"  color="var(--white)" />
        <ComponentButton :disabled="isButtonsDisabled" @click="createBuild" label="save" bg_color="#21611B" color="var(--white)"/>
    </div>
</section>

<ComponentBlur v-if="openAlert || isLoading"/>
<ComponentAlert v-if="openAlert" v-on:close="alertAction(false)"  v-on:confirm="alertAction(true)" :alert="alertMessage" :user-interaction="alertInteraction"/>

<AnimationsLoading v-if="isLoading" :full-screen="true"/>
<ComponentUploadingStatus v-if="isLoading" 
    :uploadStarted="uploadingStates.uploadStarted"
    :document="uploadingStates.document"
    :images="uploadingStates.images"
    :litematic="uploadingStates.litematic"
    :inventory="uploadingStates.inventory"
/>
</template>

<script setup lang="ts">
const router = useRouter()

import { 
    buildRef,
    imageRef,
    inventoryRef,
    storage 
} from '@/assets/scripts/firebase'
import { addDoc, serverTimestamp } from "firebase/firestore"; 
import { ref as fbRef, uploadString } from "firebase/storage"

definePageMeta({
    title: 'New Build'
})

const userid = '1234test'

const isButtonsDisabled = ref(false) // disables all buttons when true

/* Input values */
const buildId = ref('124124') // id of build in firebase

const title = ref('') // max 35 characters
const description = ref('') // max 350 characters
const difficulty = ref('easy') // easy, medium, hard
const totelBlocks = ref(0) // totel blocks in litematic file
const inventory = ref<{[key: string]: {
    block: string;
    count: number;
}}>({}) // inventory of litematic file


const litematic = ref() // litematic file
const isLitematicImported = ref(false) // true when litematic file is imported

const images = ref<string[]>([]) // all images data_url
const thumbnailIndex = ref<number>() // index of thumbnail image

/* alert */
const openAlert = ref(false) // opens alert popup
const alertConfirm = ref(false) // confirms alert popup
const alertMessage = ref('') // message of alert popup
const alertTo = ref() // route to go to when alert is confirmed
const alertInteraction = ref(true) // type of action to take when alert is confirmed

/* loading */
const isLoading = ref(false) // shows loading animation

/* states of uploading fase */
const uploadingStates = ref({
    buildRef: "",
    uploadStarted: false,
    document: false,
    images: false,
    litematic: false,
    inventory: false,
})

/* Asings all imported images to images ref */
/* Called by image import componenet */
async function asignImages(image: string[], imagesLength: number){
    images.value = image
}

/* Asings thumbnail index to thumbnailIndex ref*/
/* Called by image import componenet */
function asignThumbnail(index: number){
    thumbnailIndex.value = index
}


/* Called by litematic import componenet */
async function asignLitematic(file: any){
    /*  
    *   Asings litematic file to litematic ref
    *   Counts all blocks in litematic file and asings it to totelBlocks ref
    *   Get block palett and count in litematic file and asings it to inventory ref
    */


    litematic.value = file

    isLitematicImported.value = true

    inventory.value =  await countBuild(file) as any
    totelBlocks.value = await countBlocks(file) as number
}

/* Called when and action is taken on the alert popup */
function alertAction(state:boolean) {
    if (state) {
        alertConfirm.value = true
        router.push(alertTo.value)
    } else {
        alertConfirm.value = false
        openAlert.value = false
    }
}

/* Called when saving newly created build */
/* Called by save button */
async function createBuild(){
    if(!checkIfSomethingIsMissing()) return


    isLoading.value = true
    isButtonsDisabled.value = true
    uploadingStates.value.uploadStarted = true

    const build = await addDoc(buildRef, {
        title: title.value,
        description: description.value,
        difficulty: difficulty.value,
        views: 0,
        blocks: totelBlocks.value,

        thumbnailIndex: thumbnailIndex.value,
        images: images.value.length,

        date: {
            created: serverTimestamp(),
            lastEdit: serverTimestamp()
        },

        userId: userid,
        user: userid,
    })

    uploadingStates.value.buildRef = build.id
    uploadingStates.value.document = true



    uploadImages(build.id)
    uploadLitematic(build.id)
    uploadInventory(build.id)
}

/* Called by createBuild() */
async function uploadImages(buildId: string) {
    /* Uploads all images from the build to firebase storage */
    const storageRef = fbRef(storage, `builds/${userid}/${buildId}/images`)
    let uploadedImages = 0

    let links: string[] = []

    for (let i = 0; i < images.value.length; i++) {
        const image = images.value[i]
        const imagesRef = fbRef(storageRef, `${i}.png`)

        await uploadString(imagesRef, image, 'data_url').then((snapshot) => {
            console.log(`Uploaded image ${i}`)
            uploadedImages++
        })

        await getDownloadURL(imagesRef).then((url) => {
            links.push(url)
        })

        
        if (uploadedImages == images.value.length) {
            console.log('Uploaded all images')
            uploadingStates.value.images = true
        }
    }

    addDoc(imageRef, {
        buildId: buildId,
        links: links
    })
}

/* Called by createBuild() */
async function uploadLitematic(buildId: string) {
    /* Uploads litematic file to the firebase storage */
    const storageRef = fbRef(storage, `builds/${userid}/${buildId}/litematic`)
    const litematicRef = fbRef(storageRef, `build.litematic`)

    let reader = new FileReader()

    reader.onload = function(e:any) {
        uploadString(litematicRef, e.target?.result, 'data_url').then((snapshot) => {
        console.log('Uploaded litematic file')
        uploadingStates.value.litematic = true
    })}

    reader.readAsDataURL(litematic.value)
}

/* Called by createBuild() */
async function uploadInventory(buildId: string) {
    /* Uploads inventory documents to firebase firestore */
    let uploadedInventory = 0

    for(let key in inventory.value) {
        if (inventory.value[key].block == "minecraft:air") continue


        await addDoc(inventoryRef, {
            buildId: buildId,
            block: inventory.value[key].block,
            count: inventory.value[key].count
        }).then(() => {
            console.log(`Uploaded inventory ${key}`)
            uploadedInventory++

            if (uploadedInventory == Object.keys(inventory.value).length - 1) {
                console.log('Uploaded all inventory')
                uploadingStates.value.inventory = true
            }
        })
    }
}

/* Called by createBuild() */
function checkIfSomethingIsMissing() {
    /* Check if user has added everything to build */
    openAlert.value = true
    alertInteraction.value = false

    if(!title.value) {
        alertMessage.value = 'You have to add a title to your build'
        return false
    } else if (!description.value) {
        alertMessage.value = 'You have to add a description to your build'
        return false
    } else if (!isLitematicImported.value) {
        alertMessage.value = 'You have to import a litematic file to your build'
        return false
    } else if (!images.value.length) {
        alertMessage.value = ' You have to addat least one image to your build'
        return false
    }
     
    openAlert.value = false
    return true
}

/* watch uploading states */
watch(uploadingStates.value, (newVal) => {
    /* when all is finished it opens minecraft build page  */
    if (newVal.document && newVal.images && newVal.litematic && newVal.inventory) {
        setTimeout(() => {
            router.push(`/build/${newVal.buildRef}`)
        }, 1500)
    }
})

/* fires before router change */
router.beforeResolve((to, from, next) => {
    /* checks if upload is done or trow a warning for user */

    if (uploadingStates.value.document && uploadingStates.value.images && uploadingStates.value.litematic && uploadingStates.value.inventory) {
        next(true)
    } else if (alertConfirm.value) {
        next(true)
    } else {
        if (uploadingStates.value.uploadStarted) {
            alertMessage.value = 'You are still uploading your build, are you sure you want to leave?'
        } else {
            alertMessage.value = 'You have not uploaded your build, are you sure you want to leave?'
        }
        alertInteraction.value = true
        openAlert.value = true
        alertTo.value = to

        next(false)
    }
})

</script>

<style scoped>
section {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 2.938rem;
}


.new-build {
    display: flex;
    gap: 0.625rem;
}

.build-details {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}


.build-undertitel {
    display: flex;
    gap: 1.2rem;
}

.build-open-3d{
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font: var(--undertitle);
    color: var(--white);
    cursor: pointer;
}


.build-open-3d {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
}


.edit-input {
    outline: none;
    border: none;
    background-color: transparent;
    resize: none;
    transition: all 0.2s ease;
    color: var(--white);
}

.edit-description {
    font: var(--text);
    width: 42.5rem;
    flex: 1;
}

.buttons {
    display: flex;
    justify-content: space-between;
}
</style>