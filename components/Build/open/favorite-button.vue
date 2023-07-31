<template>
<div class="like-button">
    <AnimationsLike ref="likeBtn" :liked="liked" class="like-animation" v-on:clicked="$emit('clicked')"/>
    <p @click="play">Favorite</p>
</div>
</template>

<script setup lang="ts">
defineProps<{
    liked: boolean
}>()

defineEmits(['clicked'])

const likeBtn = ref()

function play() {
    likeBtn.value.play()
}
</script>

<style scoped>
.like-button {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    cursor: pointer;
}

.like-button p {
    font-weight: 500;
    color: var(--lower-tone);
    text-decoration: underline;
}


.like-animation {
    width: 1.8rem;
    height: 1.8rem;
}
</style>