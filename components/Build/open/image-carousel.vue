<template>
<div class="image-carousel">
    <img v-for="item in links" @click="$emit('change-preview-image', item.index)" :src="item.link" :class="{'image-carousel-current': item.active, 'image-carousel-item': true}">
</div>
</template>

<script setup lang="ts">
defineEmits(['change-preview-image'])

defineProps<{
    links: {
        index: number
        link: string
        active: boolean
    }[]
}>()
</script>

<style scoped>

.image-carousel {
    height: 37.5rem;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}

.image-carousel-item {
    width: 6.25rem;
    height: 5.625rem;
    object-fit: cover;
    border-radius: calc(var(--border-radius) / 2);

    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(0.5);
    cursor: pointer;

    transition: filter 0.2s ease;
}

.image-carousel-current {
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25)) brightness(1);
}
</style>
