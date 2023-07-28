<template>
<section class="open-build">
    <BuildOpenImage :link="currentImage"/>
    <BuildOpenImageCarousel :links="carouselItems" v-on:change-preview-image="changeImage" />
    
    <div class="build-info">
        <h1 v-if="!isEditing" class="build-title">{{ buildData.title }}</h1>
        <input v-if="isEditing" v-model="editData.title" type="text" class="edit-input edit-title" maxlength="45">

        <div class="metadata">
            <p>{{ formatDate(buildData.date.created.seconds, 1) }}</p>
            <p>@{{ buildData.username }}</p>
            <p v-if="!isEditing">/{{ buildData.difficulty }}</p>
            <BuildOpenDifficulty v-if="isEditing" v-model="editData.difficulty"/>
        </div>

        <BuildInventory :inventory="inventoryData"/>

        <p v-if="!isEditing" class="description build-text">{{ buildData.description }}</p>
        <textarea v-if="isEditing" v-model="editData.description" rows="18" maxlength="350" class="edit-input edit-description"></textarea>

        
        <div class="build-buttons" v-if="!isEditing">
            <BuildOpenLikeButton v-if="!owner" :liked="favoriteRes" v-on:like="likeBuild(favoriteRes, buildData.userId)"/>
            <BuildOpenIconButton text="3d editor" icon="/icons/build/3d-icon.svg" @click="emit('3d-editor')"/>
            <BuildOpenIconButton text="share" icon="/icons/build/share-icon.svg" @click="emit('share')"/>
            <BuildOpenIconButton v-if="owner" text="edit" icon="/icons/build/edit-icon.svg" @click="changeEditState"/>
        </div>
        <div class="edit-buttons" v-if="owner && isEditing">
            <BuildOpenIconButton text="delete" icon="/icons/build/delete-icon.svg" color="var(--red)"  @click="$emit('delete')"/>
            <BuildOpenIconButton text="save" icon="/icons/build/save-icon.svg" @click="$emit('save', editData)"/>
            <BuildOpenIconButton text="cancel" icon="/icons/build/edit-icon.svg" @click="changeEditState"/>
        </div>
    </div>
</section>
</template>

<script setup lang="ts">
import {
    BuildDocument,
    ImageDocument,
    InventoryDocument
} from '@/utils/useTypes'

const emit = defineEmits(['3d-editor', 'share', 'delete', 'save'])

const prop = defineProps<{
    buildId: string | string[]
}>()

onErrorCaptured(() => {
    console.log('error')
})



/* Data */
let buildData: BuildDocument
let imageData: ImageDocument
let inventoryData: InventoryDocument[]

try {
    buildData = await getBuildDoc(prop.buildId as string)
    imageData = await getImages(prop.buildId as string)
    inventoryData = await getBuildInventory(prop.buildId as string)
} catch {
    throw createError({ statusCode: 404, statusMessage: 'Build not found' })
}
const favoriteRes = false

const owner = computed(() => {
    if(loggedInUserId === buildData.userId) {
        return true
    } else {
        return false
    }
})

const currentImage = ref<string>('')
const carouselItems = ref<any[]>([])

await changeImage(buildData.thumbnailIndex)

async function changeImage(index: number) {
    await updateCarousel(index)
    currentImage.value = imageData.links[index]

    return
}

function updateCarousel(index: number) {
    const newCarouselPromise = new Promise((resolve) => {
        const newCarousel = imageData.links.map((link, i) => {
            if(i === index) {
                return {
                    index: i,
                    link: link,
                    active: true
                }
            } else {
                return {
                    index: i,
                    link: link,
                    active: false
                }
            }
        })

        resolve(newCarousel)
    })

    newCarouselPromise.then((newCarousel) => {
        carouselItems.value = newCarousel as any[]
    })

    return newCarouselPromise
}


/* swich userid with id form auth */
const loggedInUserId = '1234test'

/* Formatted data */

const isEditing = ref(false)
const editData = ref({
    title: buildData.title,
    description: buildData.description,
    difficulty: buildData.difficulty
})

function changeEditState() {
    isEditing.value = !isEditing.value
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