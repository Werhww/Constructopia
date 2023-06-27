<template>
<BuildOpen 
  v-on:share="share"
  v-on:3d-editor="open3dEditor"
  v-on:change-preview-image="changeShownImage"

  :build-id="id"
  :build="buildData"

  :images="buildImages"
  :current-image="currentImage"

  :favorite="buildFavorite"
    
  :inventory="buildInventory"

  :loading="loading"
/>

<BuildListRecommended title="Recommended" />

<ComponentAlert v-if="showAlert" :alert="alertMessage" :user-interaction="alertType" v-on:close="alertClose"/>
<ComponentBlur v-if="showAlert" />
</template>

<script setup lang="ts">
const router = useRouter()
const { id } = useRoute().params

const loading = ref({
  buildDoc: false,
  buildImages: false,
  buildInventory: false
})

const { 
  buildData, buildInventory, buildImages, currentImage, buildFavorite,

  getBuildDoc, getBuildInventory, getImages, changeShownImage, checkFavoriteState
} = useBuild()

onMounted(async () => {
  loading.value.buildDoc = await getBuildDoc(id)
  loading.value.buildImages = await getImages(id)
  loading.value.buildInventory = await getBuildInventory(id)
})

definePageMeta({
  title: 'Build'
})

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref(false)

function alertClose() {
  router.back()
}

/* Change to auth id for prod */
const userId = '123'

function share() {
  console.log('share')
}

function open3dEditor() {
  console.log('open 3d editor')
}
</script>

<style scoped>

</style>