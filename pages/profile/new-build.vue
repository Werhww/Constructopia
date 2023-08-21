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
            <ComponentCategorySearch></ComponentCategorySearch>
            <textarea v-model="description" :disabled="isButtonsDisabled" rows="18" maxlength="350" placeholder="description...." class="edit-input edit-description"></textarea>
        </div>
    </div>
    <div class="buttons">
        <ComponentButton :disabled="isButtonsDisabled" @click="router.back()" label="cancel" bg_color="var(--inventory-item-background)"  color="var(--white)" />
        <ComponentButton :disabled="isButtonsDisabled" @click="createBuild" label="save" bg_color="#21611B" color="var(--white)"/>
    </div>
</section>

<ComponentBlur v-if="openAlert"/>
<ComponentAlert v-if="openAlert" v-on:cancel="alertAction(false)"  v-on:confirm="alertAction(true)" :alert="alertMessage" :user-interaction="alertInteraction" :is-warining="true"/>

</template>

<script setup lang="ts">
import { newBuild } from '@/models/upload'
const router = useRouter()
definePageMeta({
    title: 'New Build',
})

const Build = new newBuild(TestUserId)

const isButtonsDisabled = ref(false) // disables all buttons when true

/* Input values */
const title = ref('') // max 35 characters
const description = ref('') // max 350 characters
const difficulty = ref('easy') // easy, medium, hard, expert, insane

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
    litematic.value = file
    isLitematicImported.value = true
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

    isButtonsDisabled.value = true
    Build.upload({
        title: title.value,
        description: description.value,
        difficulty: difficulty.value,
        images: images.value,
        thumbnailIndex: thumbnailIndex.value as number,
        litematicFile: litematic.value,
        categorys: [],
        username: 'test',
    })
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