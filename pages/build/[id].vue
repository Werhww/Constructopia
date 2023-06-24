<template>
<BuildOpen 
  v-on:share="share"
  v-on:3d-editor="open3dEditor"

  :build-id="id"

  :build="buildDetails"

  :favorite="true"
    
  :inventory="[
    {
      amount: 550,
      block_image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/67/Cobblestone.png',
      block_name: 'minecraft:cobblestone'
    }, 
    {
      amount: 1550,
      block_image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2f/Dirt.png',
      block_name: 'minecraft:dirt'
    },
    {
      amount: 100,
      block_image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/71/Sand_JE5_BE3.png',
      block_name: 'minecraft:sand'
    },
    {
      amount: 100,
      block_image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/3/3e/Glass_JE4_BE2.png',
      block_name: 'minecraft:glass'
    }
  ]" 
/>


<BuildListRecommended title="Recommended" />
</template>

<script setup lang="ts">
import { getDoc, getDocs, doc } from 'firebase/firestore';
import { 
  buildRef,
  inventoryRef,
  storage 
} from '@/assets/scripts/firebase'

const { id } = useRoute().params
definePageMeta({
  title: 'Build'
})

const buildDetails = ref<any>({
  title: '',
  description: '',
  difficulty: '',
  blocks: 0,
  images: 0,
  thumbnailIndex: 0,
  views: 0,
  date: {
    created: '',
    lastEdited: ''
  },
  user: '',
  userId: ''
})


onMounted(async () => {
  buildDetails.value = (await getDoc(doc(buildRef, id as string))).data()
  console.log(buildDetails.value)
})

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