<template>
<section class="open-build">
    <BuildOpenImage :image_link="build.image"/>
    <div class="build-info">
        <h1 v-if="!isEditing">{{ build.title }}</h1>
        <input v-if="isEditing" v-model="editData.title" type="text" class="edit-input edit-title" maxlength="45">
        <div class="metadata">
            <p>{{ formattedDate }}</p>
            <p>@{{ build.user }}</p>
            <p v-if="!isEditing">/{{ build.difficulty }}</p>
            <BuildOpenDifficulty v-if="isEditing" v-model="editData.difficulty"/>
        </div>
        <BuildInventory :inventory="inventory" />
        <p v-if="!isEditing" class="description">{{ build.description }}</p>
        <textarea v-if="isEditing" v-model="editData.description" rows="18" maxlength="350" class="edit-input edit-description"></textarea>

        <div class="build-buttons" v-if="!isEditing">
            <BuildOpenLikeButton v-if="!owner" :liked="false" v-on:like="like"/>
            <BuildOpenIconButton text="3d editor" :icon="threeD_icon" @click="emit('3d-editor')"/>
            <BuildOpenIconButton text="share" :icon="share_icon" @click="emit('share')"/>
            <BuildOpenIconButton v-if="owner" text="edit" :icon="edit_icon" @click="changeEditState"/>
        </div>
        <div class="edit-buttons" v-if="owner && isEditing">
            <BuildOpenIconButton text="delete" :icon="delete_icon" color="#C11212"  @click="deleteBuild"/>
            <BuildOpenIconButton text="save" :icon="save_icon" @click="saveBuild"/>
        </div>
    </div>
</section>
</template>

<script setup lang="ts">
import moment from 'moment'

/* Image imports */
import threeD_icon from '/icons/build/3d-icon.svg'
import share_icon from '/icons/build/share-icon.svg'
import edit_icon from '/icons/build/edit-icon.svg'
import delete_icon from '/icons/build/delete-icon.svg'
import save_icon from '/icons/build/save-icon.svg'



/* swich userid with id form auth */
const userID = '1'

const prop = defineProps<{
    build: {
        userId: string
        image: string
        title: string
        date: string
        user: string
        description: string
        difficulty: string
        blocks: number
        views: number
    }

    inventory: {
        amount: number
        block_image: string
    }[]
}>()

const emit = defineEmits(['3d-editor', 'share'])

/* Formatted data */
const owner = computed(() => {
    if(userID === prop.build.userId) {
        return true
    } else {
        return false
    }
})
const formattedDate = moment(prop.build.date).format('YYYY.MM.DD')

const isEditing = ref(false)
const editData = ref({
    title: prop.build.title,
    description: prop.build.description,
    difficulty: prop.build.difficulty
})

function changeEditState() {
    isEditing.value = !isEditing.value
}

function like(liked: boolean) {
    console.log('liked: ', liked)
    /* firebase function */
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
    width: 65rem;
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

    border-radius: 0.625rem;
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
    justify-content: start;
    gap: 2rem;
}
</style>