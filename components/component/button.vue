<template>
<div class="Custom-button" @click="$emit('click')">
    {{ label }}
</div>
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
    color: v-bind(color);
    font: var(--text);
    font-weight: 600;
    border-radius: var(--border-radius);
}
</style>