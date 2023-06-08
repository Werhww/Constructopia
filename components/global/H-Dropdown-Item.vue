<script setup lang="ts">
const prop = defineProps<{
    text: string
    to: string
    image:string

    isLink?: boolean
}>()
</script>

<template>
<div class="wrapper">
    <NuxtLink v-if="!isLink" :to="to" class="text">{{ text }}</NuxtLink>
    <p class="text" v-if="isLink">{{ text }}</p>
    <div>
        <img v-bind:src="image">
    </div>
</div>
</template>

<style scoped>
.wrapper {
    display: flex;

    justify-content: center;
    gap: 1.125rem;

    width:max-content;

    cursor: pointer;
}

.wrapper > div {
    display: flex;
    justify-content: center;
    width: 1.125rem;
}


.text {
    font: var(--text);
    color: var(--white-2);

    text-decoration: none;
}

.wrapper > p {
    margin: 0;
}
</style>