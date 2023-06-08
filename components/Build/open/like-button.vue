<template>
<div class="like-button">
    <AnimationsLike ref="likeBtn" :liked="liked" class="like-animation" v-on:like="emit('like', liked)"/>
    <p @click="play">Favorite</p>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    liked: boolean
}>()

const emit = defineEmits<{
    (e: 'like', value: boolean): void
}>()

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