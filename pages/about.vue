<template>
<div>
    <div>
        <h3>Block id</h3>
        <input type="text" v-model="blockId">
    </div>
    <div>
        <h3>Block image link</h3>
        <input type="text" v-model="blockImageLink">
    </div>
    <button @click="addBlock">Add block</button>
</div>
</template>

<script setup lang="ts">
const route = useRoute()

definePageMeta({
  title: 'About',
  routesToHere: [
    { name: 'Home', path: '/'},
    { name: 'About', path: '/about'}
  ]
})

useHead({
  meta: [{ property: 'og:title', content: `Constructopia - ${route.meta.title}` }]
})


const blockId = ref('')
const blockImageLink = ref('')


function addBlock() {

    setDoc(doc(db, "blockImages", `minecraft:${blockId.value}`), {
        url: `${blockImageLink.value}`
    })


    blockId.value = ''
    blockImageLink.value = ''
}
/* har gjort Button neste er Jack O’Lantern */
/* https://wiingy.com/blog/minecraft-blocks/ */
/* https://minecraft.fandom.com/wiki/Wood */
</script>

<style scoped>

</style>