<template>
<div class="build-img" v-if="loading">
    <img class="build-img-img" :src="link">
</div>
<div v-else class="build-img loading-animation"></div>
</template>

<script setup lang="ts">
defineProps<{
    link: string
    loading: boolean
}>()

</script>

<style scoped>
.build-img {
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

.build-img:hover .build-img-img {
    transform: scale(1.05);
    filter: blur(2px) brightness(0.7);
}

.loading-animation {
    background-color: var(--dark);
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