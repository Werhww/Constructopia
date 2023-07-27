<template>
<div class="image-carousel" v-if="loading">
    <img v-for="item in links" @click="$emit('change-preview-image', item.index)" :src="item.link" :class="{'image-carousel-current': item.active, 'image-carousel-item': true}">
</div>
<div class="image-carousel" v-else>
    <div v-for="i in 6" class="image-carousel-item-loading loading-animation"></div>
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

    loading: boolean
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

.image-carousel-item-loading {
    width: 6.25rem;
    height: 5.625rem;
    border-radius: calc(var(--border-radius) / 2);
}

.loading-animation {
    background-color: var(--dark)!important;
    background-image: linear-gradient(
        90deg,
        var(--dark) 20%,
        var(--lower-tone) 50%,
        var(--dark) 80%
    );
	background-size: 40px 100%;
	background-repeat: no-repeat;
	background-position: left -40px top 0; 
	animation: shine 1s ease infinite;
}

@keyframes shine {
	to {
		background-position: right -40px top 0;
	}
}
</style>
