<template>
<BuildOpen 
  v-on:share="share"
  v-on:3d-editor="open3dEditor"

  :build-id="id"
  :build="buildData"

  :images="buildImages"
  :current-image="currentImage"

  :favorite="buildFavorite"
    
  :inventory="buildInventory" 
/>

<BuildListRecommended title="Recommended" />

<ComponentAlert v-if="showAlert" :alert="alertMessage" :user-interaction="alertType" v-on:close="alertClose"/>
<ComponentBlur v-if="showAlert" />
</template>

<script setup lang="ts">


const router = useRouter()
const { id } = useRoute().params

const { 
  buildData, buildInventory, buildImages, currentImage, buildFavorite,

  getBuildDoc, getBuildInventory, getImages, changeShownImage,
} = useBuild()

onMounted(async () => {
  await getBuildDoc(id)
  await getBuildInventory(id)
  await getImages(id)
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