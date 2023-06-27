<template>
<section class="open-build">
    <BuildOpenImage :image_link="currentImage" :loading="loading.buildImages"/>
    <BuildOpenImageCarousel :images="images" :loading="loading.buildImages" v-on:change-preview-image="emitChangePreviewImage" />
    <div class="build-info">
        <h1 v-if="!isEditing && loading.buildDoc" class="build-title">{{ build.title }}</h1>
        <ComponentLoadingText class="build-title-loading" v-if="!loading.buildDoc"/>
        <input v-if="isEditing" v-model="editData.title" type="text" class="edit-input edit-title" maxlength="45">

        <div class="metadata">
            <p v-if="loading.buildDoc">{{ formatDate(build.date.created.seconds, 1) }}</p>
            <p v-if="loading.buildDoc">@{{ build.user }}</p>
            <p v-if="!isEditing && loading.buildDoc">/{{ build.difficulty }}</p>
            <BuildOpenDifficulty v-if="isEditing" v-model="editData.difficulty"/>
        </div>
        <div class="metadata-loading">
            <ComponentLoadingText  v-if="!loading.buildDoc" class="build-text-loading"/>
            <ComponentLoadingText  v-if="!loading.buildDoc" class="build-text-loading"/>
            <ComponentLoadingText  v-if="!loading.buildDoc" class="build-text-loading"/>
        </div>

        <BuildInventory :inventory="inventory" :loading="loading.buildInventory" />

        <p v-if="!isEditing && loading.buildDoc" class="description build-text">{{ build.description }}</p>
        <ComponentLoadingText  v-if="!loading.buildDoc" class="build-text-loading"/>
        <textarea v-if="isEditing" v-model="editData.description" rows="18" maxlength="350" class="edit-input edit-description"></textarea>

        <div class="build-buttons" v-if="!isEditing">
            <BuildOpenLikeButton v-if="!owner" :liked="favorite" v-on:like="likeBuild(favorite, build.userId)"/>
            <BuildOpenIconButton text="3d editor" icon="/icons/build/3d-icon.svg" @click="emit('3d-editor')"/>
            <BuildOpenIconButton text="share" icon="/icons/build/share-icon.svg" @click="emit('share')"/>
            <BuildOpenIconButton v-if="owner" text="edit" icon="/icons/build/edit-icon.svg" @click="changeEditState"/>
        </div>
        <div class="edit-buttons" v-if="owner && isEditing">
            <BuildOpenIconButton text="delete" icon="/icons/build/delete-icon.svg" color="var(--red)"  @click="initalDelete"/>
            <BuildOpenIconButton text="save" icon="/icons/build/save-icon.svg" @click="saveBuild"/>
            <BuildOpenIconButton text="cancel" icon="/icons/build/edit-icon.svg" @click="changeEditState"/>
        </div>
    </div>
    
    <div v-if="deletePrompt && owner && isEditing" class="delete-prompt">
        <p>Are you sure you want to delete this build?</p>
        <div class="delete-prompt-buttons">
            <BuildOpenIconButton text="delete" icon="/icons/build/delete-icon.svg" color="var(--red)"  @click="deleteBuild"/>
            <BuildOpenIconButton text="cancel" icon="/icons/build/edit-icon.svg" @click="initalDelete"/>
        </div>
    </div>
</section>
</template>

<script setup lang="ts">
import type { 
    BuildDocument,
    BuildInventory
} from '@/assets/scripts/useTypes';

const emit = defineEmits(['3d-editor', 'share', 'change-preview-image'])

function emitChangePreviewImage(index: number) {
    emit('change-preview-image', index)
}

const prop = defineProps<{
    buildId: string | string[]

    build: BuildDocument

    favorite: boolean

    currentImage: string
    images: {
        image:string
        current:boolean
        index:number
    }[]

    inventory: BuildInventory[]

    loading: {
        buildDoc: boolean,
        buildImages: boolean,
        buildInventory: boolean
    }
}>()

/* swich userid with id form auth */
const loggedInUserId = '123'

/* Formatted data */
const owner = computed(() => {
    if(loggedInUserId === prop.build.userId) {
        return true
    } else {
        return false
    }
})

const isEditing = ref(false)
const editData = ref({
    title: prop.build.title,
    description: prop.build.description,
    difficulty: prop.build.difficulty
})

function changeEditState() {
    isEditing.value = !isEditing.value
}

const deletePrompt = ref(false)

function initalDelete() {
    deletePrompt.value = !deletePrompt.value
}

function deleteBuild() {
    /* firebase function */
    console.log('delete')
}

function saveBuild() {
    /* firebase function */
    console.log('save')
    console.log(editData.value)
    changeEditState()
}
</script>

<style scoped>
.delete-prompt {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    padding: 1rem .75rem;
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    position: absolute;
    top: 20rem;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--background);
    color: var(--white);
}

.delete-prompt-buttons {
    display: flex;
    justify-content: space-between;
}

.edit-input {
    outline: none;
    border: none;
    background-color: transparent;
    resize: none;
    transition: all 0.2s ease;
    color: var(--lower-tone);
}
.edit-input:focus {
    color: var(--white);
}

.edit-title {
    font: var(--title);
    font-style: normal;
    width: fit-content;
}

.edit-description {
    font: var(--text);
    width: 42.5rem;
    flex: 1;
}


.open-build {
    display: flex;
    gap: 1rem;
}

.build-img {
    width: 42.5rem;
    height: 37.5rem;
    object-fit: cover;

    border-radius: var(--border-radius);
}

.build-info {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

.build-title {
    font: var(--title);
    font-style: normal;
    color: var(--white);
}

.build-title-loading {
    font-style: normal;
    font: var(--title);
}

.build-text {
    font: var(--text);
    color: var(--lower-tone);
}

.build-text-loading {
    font: var(--text);
    flex: 1;
}


.metadata {
    display: flex;
    gap: 1rem;
}

.metadata-loading {
    display: flex;
    gap: 1rem;
}

.metadata > p {
    font: var(--undertitle);
    color: var(--lower-tone);
}

.metadata-loading > p {
    font: var(--undertitle);
}

.description {
    flex: 1;
}

.build-buttons, .edit-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
}
</style>