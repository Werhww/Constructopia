<template>
<div class="build-img">
    <img class="build-img-img" :src="image_link" @mousemove="mouseOver">
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    image_link: string
}>()

const mouseX = ref(0)
const mouseY = ref(0)

function mouseOver(e:MouseEvent) {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
}

</script>

<style scoped>
.build-img {
    width: 42.5rem;
    height: 37.5rem;
    overflow: hidden;
    cursor: url('/src/assets/3d-icon-bigger.svg'), auto;
    user-select: none;
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

.build-img-img {
    object-fit: cover;
    pointer-events: none;
    border-radius: 0.625rem;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
}

.build-img:hover .build-img-img {
    transform: scale(1.05);
    filter: blur(2px) brightness(0.7);
}
</style>