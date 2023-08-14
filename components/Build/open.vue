<template>
<section class="open-build">
    <BuildOpenImage :link="currentImage"/>
    <BuildOpenImageCarousel :links="carouselImages" v-on:change-preview-image="changeImage" />
    
    <div class="build-info">
        <h1 v-if="!isEditing" class="build-title">{{ build.title }}</h1>
        <input v-if="isEditing" v-model="editData.title" type="text" class="edit-input edit-title" maxlength="45">

        <div class="metadata">
            <p>{{ formatDate(build.date.created.seconds, 1) }}</p>
            <p>@{{ build.username }}</p>
            <div class="views">
                <img src="/icons/build/view-icon.svg">
                <p>{{ build.views }}</p>
            </div>
            <p v-if="!isEditing">/{{ build.difficulty }}</p>
            <BuildOpenDifficulty v-if="isEditing" v-model="editData.difficulty"/>
        </div>

        <BuildInventory :inventory="inventory"/>

        <p v-if="!isEditing" class="description build-text">{{ build.description }}</p>
        <textarea v-if="isEditing" v-model="editData.description" rows="18" maxlength="350" class="edit-input edit-description"></textarea>

        
        <div class="build-buttons" v-if="!isEditing">
            <BuildOpenFavoriteButton v-if="!owner" :liked="favorite" v-on:clicked="change_favorite"/>
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
import { UserBuild } from '@/models/builds'
const emit = defineEmits(['3d-editor', 'share'])

const prop = defineProps<{
    buildId: string | string[]
}>()

/* auth.currentuser.id */
/* swich userid with id form auth */
const loggedInUserId = '1234test'

const builder = new UserBuild(prop.buildId as string, '1234tesdt')

let { build, images, inventory, favorite, owner } = await builder.getBuild()

builder.updateFavoriteState()


useHead({
    meta: [
        { property: 'og:title', content: `Constructopia - ${build.title}` },
        { property: 'og:description', content: build.description },
        { property: 'og:image', content: images.links[build.thumbnailIndex] },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: `https://constructopia.net/build/${build.buildId}` },
        { property: 'og:type', content: 'website'}
    ]
})

const currentImage = ref<string>('')
const carouselImages = ref<any[]>([])
await changeImage(build.thumbnailIndex)

async function changeImage(index: number) {
    await updateCarousel(index)
    currentImage.value = images.links[index]

    return
}

function updateCarousel(index: number) {    
    const newCarouselPromise = new Promise((resolve) => {
        const newCarousel = images.links.map((link, i) => {
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
        carouselImages.value = newCarousel as any[]
    })

    return newCarouselPromise
}

function change_favorite() {
    /* change with auth */
    console.log('change favorite')
    updateFavorite('1234test', build.buildId)
}

const isEditing = ref(false)
const editData = ref({
    title: build.title,
    description: build.description,
    difficulty: build.difficulty
})

function changeEditState() {
    isEditing.value = !isEditing.value
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

.build-text {
    font: var(--text);
    color: var(--lower-tone);
}


.metadata {
    display: flex;
    gap: 1rem;
}

.metadata p {
    font: var(--undertitle);
    color: var(--lower-tone);
}

.views {
    display: flex;
    gap: 0.25rem;
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