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
import { db } from 'assets/scripts/firebase';
import { setDoc, doc } from 'firebase/firestore';


definePageMeta({
    title: 'Constructopia',
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