<template>
<div :class="{'image-import': true, 'image-imported': previewOpen}">
    <input v-on:change="importImage" ref="imageInput" type="file" accept="image/apng, image/avif, image/jpeg, image/png, image/webp, image/svg+xmllø" multiple>
    <img v-if="!previewOpen" class="import-image" src="/icons/components/import-image.svg" @click="openImport">
    <div v-if="!previewOpen" @click="openImport" class="background_with_blur"><!-- Background color with blur --></div>

    <img v-if="previewOpen" class="preview-image" :src="thumbnail_preview" @click="openImport">
</div>
<div class="preview-carousel">
    <img v-for="item in preview_images" @click="changePreviewImage(item.index)" :src="item.image" :class="{'preview-carousel-current': item.current, 'preview-carousel-item': true}">
</div>
</template>

<script setup lang="ts">
const emit = defineEmits(['image-imported'])

const previewOpen = ref(false)
const thumbnail_preview = ref()
const preview_images = ref<{
    image:string
    current:boolean
    index:number

}[]>([])

const imageInput = ref()

function openImport(){
    imageInput.value.click()
}

function importImage(event: any){
    if (!checkImageCount(event.target.files)) return
    readThumbnail(event.target.files[0])
    readImages(event.target.files)
    emit('image-imported', preview_images.value)

    previewOpen.value = true
}

function checkImageCount(images: any){
    if (images.length > 6) {
        alert('You can only upload 5 images')
        return false
    } else {
        return true
    }
}

function readThumbnail(thumbnail: any) {
    const reader = new FileReader();
    reader.onload = (e:any) => {
        thumbnail_preview.value = e.target.result;
    }
    reader.readAsDataURL(thumbnail)
}

function readImages(images: any) {
    preview_images.value = []
    let current_index = 0

    for (let i = 0; i < images.length; i++) {
        const reader = new FileReader();


        reader.onload = (e: any) => {
            if (i == 0) {
                preview_images.value.push({
                    image: e.target.result,
                    current: true,
                    index: current_index
                });
                current_index ++
                return
            }

            preview_images.value.push({
                image: e.target.result,
                current: false,
                index: current_index
            });
            current_index ++


        };

        reader.readAsDataURL(images[i]);
    }
}

function changePreviewImage(index: number){
    preview_images.value.forEach((item) => {
        item.current = false
    })
    preview_images.value[index].current = true
    thumbnail_preview.value = preview_images.value[index].image
}
</script>

<style scoped>
.image-import {
    width: 18.75rem;
    height: 18.75rem;
    overflow: hidden;
    cursor: pointer;

    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));

    transition: all 0.2s ease;
}

.image-imported {
    width: 42.5rem;
    height: 37.5rem;
    object-fit: cover;
    border-radius: var(--border-radius);
}

.background_with_blur{
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

.preview-carousel {
    overflow: hidden;

    height: 37.5rem;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

.preview-carousel-item{
    width: 6.25rem;
    height: 5.625rem;
    object-fit: cover;
    border-radius: calc(var(--border-radius) / 2);

    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(0.5);
    cursor: pointer;

    transition: filter 0.2s ease;
}

.preview-carousel-current {
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(1);
}
</style>