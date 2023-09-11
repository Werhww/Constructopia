<template>
<section class="open-build">
    <BuildOpenImage :link="currentImage"/>
    <BuildOpenImageCarousel :links="carouselImages" v-on:change-preview-image="changeImage" />
    
    <div class="build-info">
        <h1 v-if="!isEditing" class="build-title">{{ build.title }}</h1>
        <input v-if="isEditing" v-model="editData.title" type="text" class="edit-input edit-title" :maxlength="MAX_TITLE_LENGTH">

        <div class="metadata">
            <p>{{ formatDate(build.date.created.seconds, 1) }}</p>
            <p>@{{ build.username }}</p>
            <div class="views">
                <img src="/icons/build/view-icon.svg">
                <p>{{ build.views }}</p>
            </div>
            <p v-if="!isEditing">/{{ build.difficulty }}</p>
            <BuildOpenDifficulty v-else v-model="editData.difficulty"/>
        </div>

        <BuildOpenCategoryShower :categorys="build.categorys"/>
        <BuildInventory v-if="inventory.length < 20" :inventory="inventory"/>

        <p v-if="!isEditing" class="description build-text">{{ build.description }}</p>
        <textarea v-else v-model="editData.description" :rows="18" :maxlength="MAX_COMMENT_LENGTH" class="edit-input edit-description"></textarea>

        
        <div class="build-buttons" v-if="!isEditing">
            <BuildOpenFavoriteButton v-if="!owner" :liked="favorite" v-on:clicked="builder.updateFavoriteState()"/>
            <BuildOpenIconButton text="3d editor" icon="/icons/build/3d-icon.svg" @click="emit('3d-editor')"/>
            <BuildOpenIconButton text="share" icon="/icons/build/share-icon.svg" @click="emit('share')"/>
            <BuildOpenIconButton v-if="owner" text="edit" icon="/icons/build/edit-icon.svg" @click="changeEditState"/>
        </div>
        <div class="edit-buttons" v-if="owner && isEditing">
            <BuildOpenIconButton text="delete" icon="/icons/build/delete-icon.svg" color="var(--red)"  @click="openAlert(ALERT_MESSAGES.delete, true, 'delete')"/>
            <BuildOpenIconButton text="save" icon="/icons/build/save-icon.svg" @click="openAlert(ALERT_MESSAGES.save, false, 'save')"/>
            <BuildOpenIconButton text="cancel" icon="/icons/build/edit-icon.svg" @click="changeEditState"/>
        </div>
    </div>

    <BuildInventory v-if="inventory.length > 20"  :inventory="inventory"/>
</section>

<ComponentAlert 
    v-if="isAlertOpen" 
    :alert="Alert.message" 
    :user-interaction="true" 
    :is-warining="Alert.isWarning"

    v-on:confirm="confirmAlert"
    v-on:cancel="cancelAlert"
/>
<ComponentBlur v-if="isAlertOpen"/>
</template>

<script setup lang="ts">
import { UserBuild } from '@/models/builds'

const router = useRouter()
const emit = defineEmits(['3d-editor', 'share'])

const prop = defineProps<{
    buildId: string | string[],
}>()

/* auth.currentuser.id */
/* swich userid with id form auth */
const builder = new UserBuild(prop.buildId as string, getUId())
const { build, inventory, favorite, owner } = await builder.getBuild()

useSeoMeta({
    title: `Build - ${build.title}`,
    description:build.description,
    ogTitle: `Constructopia - ${build.title}`,
    ogDescription: build.description,
    ogImage: build.links[build.thumbnailIndex],
    ogUrl: `https://constructopia.net/build/${build.userId}/${build.buildId}`,
    twitterTitle: build.title,
    twitterDescription: build.description,
    twitterImage: build.links[build.thumbnailIndex],
    twitterCard: 'summary'
})

const isEditing = ref(false)
const editData = ref({
    thumbnailIndex: build.thumbnailIndex,
    title: build.title,
    description: build.description,
    difficulty: build.difficulty,
})

const currentImage = ref<string>('')
const carouselImages = ref<any[]>([])
await changeImage(build.thumbnailIndex)

async function changeImage(index: number) {
    await updateCarousel(index)
    editData.value.thumbnailIndex = index
    currentImage.value = build.links[index]

    return
}

function updateCarousel(index: number) {    
    const newCarouselPromise = new Promise((resolve) => {
        const newCarousel = build.links.map((link, i) => {
            if(i === index) {
                return {
                    index: i,
                    link: link,
                    active: true
                }
            }
            
            return {
                index: i,
                link: link,
                active: false
            }
        })

        resolve(newCarousel)
    })

    newCarouselPromise.then((newCarousel) => {
        carouselImages.value = newCarousel as any[]
    })

    return newCarouselPromise
}

const isAlertOpen = ref(false)

const Alert = ref({
    message: "",
    isWarning: false,
    type: ""
})

function changeEditState() {
    isEditing.value = !isEditing.value
}


function openAlert(message: string, isWarning: boolean, alertType:string) {
    Alert.value = {
        message: message,
        isWarning: isWarning,
        type: alertType
    }
    isAlertOpen.value = true
}

function confirmAlert() {
    if(Alert.value.type === 'delete') {
        const BuildOwnerId = builder.deleteBuild()
        router.push(`/builds/${BuildOwnerId}`)
    } else if(Alert.value.type === 'save') {
        builder.saveBuild(editData.value)
    }

    isAlertOpen.value = false
}

function cancelAlert() {
    isAlertOpen.value = false
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
    width: 31.75rem;
}

.edit-description {
    font: var(--text);
    width: 31.75rem;
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

    width: 35%;
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
    white-space: break-spaces;
}

.build-buttons, .edit-buttons {
    display: flex;
    justify-content: flex-start;
    gap: 2rem;
}
</style>