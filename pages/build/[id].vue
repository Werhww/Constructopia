<template>
<BuildOpen 
  v-on:share="share"
  v-on:3d-editor="open3dEditor"

  :build="{
    userId: '123',
    image: 'https://i.pinimg.com/736x/f5/c0/a2/f5c0a23a575e40913a2056441a30412b.jpg',
    title: 'The Ultimate Survival Base',
    date: '2023-05-18T15:00:00',
    user: 'John-Doe',
    difficulty: 'easy',
    description: 'This is a description',
    blocks: 5,
    views: 100 
  }" 
    
  :inventory="[
    {
      amount: 550,
      block_image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/6/67/Cobblestone.png'
    }, 
    {
      amount: 1550,
      block_image: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/2f/Dirt.png'
    }   
  ]" 
/>

<BuildListRecommended title="Recommended" />
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Build'
})

/* Change to auth id for prod */
const userId = '123'

const { id } = useRoute().params

function share() {
  console.log('share')
}

function open3dEditor() {
  console.log('open 3d editor')
}
</script>

<style scoped>

</style>