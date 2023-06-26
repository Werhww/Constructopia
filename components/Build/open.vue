<template>
<section class="open-build">
    <BuildOpenImage :image_link="currentImage"/>
    <div class="image-carousel">
        <img v-for="item in images" @click="changeShownImage(item.index)" :src="item.image" :class="{'image-carousel-current': item.current, 'image-carousel-item': true}">
    </div>
    <div class="build-info">
        <h1 v-if="!isEditing">{{ build.title }}</h1>
        <input v-if="isEditing" v-model="editData.title" type="text" class="edit-input edit-title" maxlength="45">

        <div class="metadata">
            <p>{{ formatDate(build.date.created.seconds, 1) }}</p>
            <p>@{{ build.user }}</p>
            <p v-if="!isEditing">/{{ build.difficulty }}</p>
            <BuildOpenDifficulty v-if="isEditing" v-model="editData.difficulty"/>
        </div>
        <BuildInventory :inventory="inventory" />
        <p v-if="!isEditing" class="description">{{ build.description }}</p>
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
    
    <div v-if="deletePrompt" class="delete-prompt">
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

const { changeShownImage } = useBuild()

/* swich userid with id form auth */
const loggedInUserId = '123'

const emit = defineEmits(['3d-editor', 'share'])

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
}>()

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

.build-info > h1{
    font: var(--title);
    font-style: normal;
    color: var(--white);
}

.build-info > p{
    font: var(--text);
    color: var(--lower-tone);
}


.metadata {
    display: flex;
    gap: 1rem;
}

.metadata > p {
    font: var(--undertitle);
    color: var(--lower-tone);
}

.description {
    flex: 1;
}

.build-buttons, .edit-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
}

.image-carousel {
    height: 37.5rem;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

.image-carousel-item {
    width: 6.25rem;
    height: 5.625rem;
    object-fit: cover;
    border-radius: calc(var(--border-radius) / 2);

    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(0.5);
    cursor: pointer;

    transition: filter 0.2s ease;
}

.image-carousel-current {
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(1);
}
</style>