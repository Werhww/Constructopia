<template>
<button class="Custom-button" @click="$emit('click')" v-bind="$attrs">
    {{ label }}
</button>
</template>

<script setup lang="ts">
defineProps<{
    label: string
    bg_color: string
    color: string
}>()

defineEmits(['click'])
</script>

<style scoped>
.Custom-button {
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    width: fit-content;

    padding: 0.375rem 5.25rem;

    background-color: v-bind(bg_color);
    border-radius: var(--border-radius);
    border: 0;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    color: v-bind(color);
    font: var(--text);
    font-weight: 600;
}
</style>