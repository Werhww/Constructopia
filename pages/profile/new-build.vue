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

<ComponentAlert v-if="openAlert" v-on:close="alertAction(false)"  v-on:confirm="alertAction(true)" :alert="alertMessage" />
</template>

<script setup lang="ts">
const router = useRouter()
const isLitematicImported = ref(false)

import { db, storage } from '@/assets/scripts/firebase'
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { ref as fbRef, uploadString } from "firebase/storage"

const buildsRef = collection(db, "builds")

definePageMeta({
    title: 'New Build'
})

const userid = '1234test'

const isButtonsDisabled = ref(false)

/* Input values */
const buildRef = ref('124124')

const title = ref('')
const description = ref('')
const difficulty = ref('easy')

const litematic = ref()

const totelBlocks = ref(0)
const inventory = ref<{[key: string]: {
    block: string;
    count: number;
}}>({})

const thumbnailIndex = ref<number>()
const images = ref<string[]>([])

/* alert */
const openAlert = ref(false)
const alertConfirm = ref(false)
const alertMessage = ref('')
const alertTo = ref()

/* states of uploading fase */
const uploadingStates = ref({
    buildRef: "",
    uploadStarted: false,
    document: false,
    images: false,
    litematic: false,
    inventory: false,
})

function asignImages(image: any){
    images.value = image

    console.log(images.value)
}

function asignThumbnail(index: number){
    thumbnailIndex.value = index
}

async function asignLitematic(file: any){
    litematic.value = file
    isLitematicImported.value = true

    inventory.value =  await countBuild(file) as any
    totelBlocks.value = await countBlocks(file) as number

    console.log(inventory.value)
    console.log(totelBlocks.value)
}

async function createBuild(){
    isButtonsDisabled.value = true
    uploadingStates.value.uploadStarted = true

    /* const buildRef = await addDoc(collection(db, "builds"), {
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

        user: userid,
    }) */

    uploadingStates.value.buildRef = /* buildRef.id */"34"
    uploadingStates.value.document = true

    uploadImages(/* buildRef.id */"34")
    uploadLitematic(/* buildRef.id */"34")
    uploadInventory(/* buildRef.id */"34")
    

    /* console.log('build created', isButtonsDisabled.value) */
}

async function uploadImages(buildId: string) {
    /* const storageRef = fbRef(storage, `builds/${userid}/${buildId}/images`)

    for (let i = 0; i < images.value.length; i++) {
        const image = images.value[i]
        const imagesRef = fbRef(storageRef, `${i}.png`)

        uploadString(imagesRef, image, 'data_url').then((snapshot) => {
            console.log(`Uploaded image ${i}`)
        })
    } */

    uploadingStates.value.images = true
}

async function uploadLitematic(buildId: string) {
    /* const storageRef = fbRef(storage, `builds/${userid}/${buildId}/litematic`)
    const litematicRef = fbRef(storageRef, `build.litematic`)

    let reader = new FileReader()

    reader.onload = function(e:any) {
        uploadString(litematicRef, e.target?.result, 'data_url').then((snapshot) => {
        console.log('Uploaded litematic file')
    })}

    reader.readAsDataURL(litematic.value) */

    uploadingStates.value.litematic = true
}

async function uploadInventory(buildId: string) {
    /* const storageRef = fbRef(storage, `builds/${userid}/${buildId}/inventory`)
    const inventoryRef = fbRef(storageRef, `inventory.json`)

    uploadString(inventoryRef, JSON.stringify(inventory.value), 'data_url').then((snapshot) => {
        console.log('Uploaded inventory file')
    }) */

    uploadingStates.value.inventory = true
}

function alertAction(state:boolean) {
    if (state) {
        alertConfirm.value = true
        router.push(alertTo.value)
    } else {
        alertConfirm.value = false
        openAlert.value = false
    }
}

watch(uploadingStates.value, (newVal) => {
    if (newVal.document && newVal.images && newVal.litematic && newVal.inventory) {
        router.push(`/build/${newVal.buildRef}`)
    }
})

router.beforeResolve((to, from, next) => {
    if (uploadingStates.value.document && uploadingStates.value.images && uploadingStates.value.litematic && uploadingStates.value.inventory) {
        console.log('ready')
        next(true)
    } else if (alertConfirm.value) {
        console.log('ready')
        next(true)
    } else {
        if (uploadingStates.value.uploadStarted) {
            alertMessage.value = 'You are still uploading your build, are you sure you want to leave?'
        } else {
            alertMessage.value = 'You have not uploaded your build, are you sure you want to leave?'
        }
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