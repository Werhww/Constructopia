<template>
<div :class="{'image-import': true, 'image-imported': previewOpen}">
    <input v-on:change="importImage" ref="imageInput" type="file" accept="image/apng, image/avif, image/jpeg, image/png, image/webp, image/svg+xmllø">
    <img v-if="!previewOpen" class="import-image" src="/icons/components/import-image.svg" @click="openImport">
    <div v-if="!previewOpen" @click="openImport"><!-- Background color with blur --></div>

    <img v-if="previewOpen" class="preview-image" :src="preview" @click="openImport">
</div>
</template>

<script setup lang="ts">
import { emit } from 'process';

const emit = defineEmits(['image-imported'])

const previewOpen = ref(false)
const preview = ref()

const imageInput = ref()

function openImport(){
    imageInput.value.click()
}

function importImage(event: any){
    var reader = new FileReader();
    reader.onload = (e:any) => {
        preview.value = e.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
    emit('image-imported', event.target.files[0])

    previewOpen.value = true
}
</script>

<style scoped>
.image-import {
    width: 18.75rem;
    height: 18.75rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));

    transition: all 0.2s ease;
}

.image-imported {
    width: 42.5rem;
    height: 37.5rem;
    object-fit: cover;
    border-radius: 0.625rem;
}

.image-import > div{
    width: 100%;
    height: 100%;

    position: absolute;

    background-color: var(--inventory-item-background);
    filter: blur(50px);
}

.image-import > input{
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0;
}

.import-image{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 10;
}

.preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>