<template>
    <div class="img-wrapper">
        <img class="build-img-img" :src="link">
    </div>
</template>

<script setup lang="ts">
defineProps<{
    link: string
}>()

</script>

<style scoped>
.img-wrapper {
    width: 42.5rem;
    height: 37.5rem;
    overflow: hidden;
    cursor: url('/icons/build/3d-icon-bigger.svg'), auto;
    user-select: none;
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

.build-img-img {
    object-fit: cover;
    pointer-events: none;
    border-radius: var(--border-radius);
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
}

.img-wrapper:hover .build-img-img {
    transform: scale(1.05);
    filter: blur(2px) brightness(0.7);
}
</style>