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
            <div class="views">
                <img src="/icons/build/view-icon.svg">
                <p>{{ buildData.views }}</p>
            </div>
            <p v-if="!isEditing">/{{ buildData.difficulty }}</p>
            <BuildOpenDifficulty v-if="isEditing" v-model="editData.difficulty"/>
        </div>

        <BuildInventory :inventory="inventoryData"/>

        <p v-if="!isEditing" class="description build-text">{{ buildData.description }}</p>
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
import {
    BuildDocument,
    ImageDocument,
    InventoryDocument
} from '@/utils/useTypes'

const route = useRoute()
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
const favorite = ref(false)

try {
    const redirectId = useState('redirect-Build-Id')

    if(!redirectId.value) {
        buildData = await getBuildDoc(prop.buildId as string)
        imageData = await getImages(prop.buildId as string)
        favorite.value = await checkIfFavorite('1234test', buildData.buildId)
        
    } else if (redirectId.value === prop.buildId) {
        buildData = useState('redirect-Build-Doc').value as BuildDocument
        imageData = useState('redirect-Image-Doc').value as ImageDocument
        const favoriteState = useState('redirect-Favorite-Status')

        if(!favoriteState) {
            favorite.value = await checkIfFavorite('1234test', buildData.buildId)
        } else {
            favorite.value = favoriteState.value as boolean
        }

    } else {
        buildData = await getBuildDoc(prop.buildId as string)
        imageData = await getImages(prop.buildId as string)
        favorite.value = await checkIfFavorite('1234test', buildData.buildId)
    }


    inventoryData = await getBuildInventory(prop.buildId as string)
} catch(error) {
    console.log(error)
    throw createError({ statusCode: 404, statusMessage: 'This build dosnt exist' })
}


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

function change_favorite() {
    /* change with auth */
    console.log('change favorite')
    updateFavorite('1234test', buildData.buildId, !favorite.value)
    favorite.value = !favorite.value
}


/* swich userid with id form auth */
const loggedInUserId = '12334test'

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