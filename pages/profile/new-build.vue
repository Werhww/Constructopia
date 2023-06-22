<template>
<section>
    <div class="new-build">
        <ComponentImageImport v-on:image-imported="asignImages" v-on:update-main-image="asignThumbnail"/>
        <div class="build-details">
            <ComponentInput v-model="title" class="build-title" placeholder="title" font_size="2.5rem" width="100%" :maxlength="35"/>
            <div class="build-undertitel">
                <BuildOpenDifficulty v-model="difficulty" :white="true" /> 
                <ComponentLitematicImport v-on:litematic-imported="asignLitematic"/>
                <div v-if="isLitematicImported" class="build-open-3d">
                    <img src="/icons/build/3d-icon-inverted.svg">
                    <p>open 3d editor</p>
                </div>
            </div>
            <textarea v-model="description" rows="18" maxlength="350" placeholder="description...." class="edit-input edit-description"></textarea>
        </div>
    </div>
    <div class="buttons">
        <ComponentButton @click="router.back()" label="cancel" bg_color="var(--inventory-item-background)"  color="var(--white)" />
        <ComponentButton @click="createBuild" label="save" bg_color="#21611B" color="var(--white)"/>
    </div>
</section>
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

/* Input values */
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
    const buildRef = await addDoc(collection(db, "builds"), {
        title: title.value,
        description: description.value,
        difficulty: difficulty.value,
        views: 0,
        blocks: 1,

        thumbnailIndex: thumbnailIndex.value,
        images: images.value.length - 1,

        date: {
            created: serverTimestamp(),
            lastEdit: serverTimestamp()
        },

        user: userid,
    })

    uploadImages(buildRef.id)
}

async function uploadImages(buildId: string) {
    const storageRef = fbRef(storage, `builds/${userid}/${buildId}/images`)


    for (let i = 0; i < images.value.length; i++) {
        const image = images.value[i]
        const imagesRef = fbRef(storageRef, `${i}.png`)

        uploadString(imagesRef, image, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!')
        })
    }
}
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