<template>
<div class="icon-button">
    <img :src="'/src/assets/' + icon" alt="icon" />
    <p>{{ text }}</p>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    icon: string
    text: string
    color?: string
}>()

const color = computed(() => {
    if(prop.color) {
        return prop.color
    } else {
        return 'var(--lower-tone)'
    }
})
</script>

<style scoped>
.icon-button {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    cursor: pointer;
}
.icon-button > p {
    font-weight: 500;
    color: v-bind(color);
    text-decoration: underline;
}
</style>