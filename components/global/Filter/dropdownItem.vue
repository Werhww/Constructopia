<script setup lang="ts">
defineProps<{
    src: string
    label: string
    size: "tiny" | "small" | "medium"
    ratio: "equal" | "width" | "height"
}>()
</script>

<template>
<SystemFlex class="item">
    <SystemFlex 
        width="1.75rem"
    >
        <SystemIcon :src="src" :alt="label" :size="size" :ratio="ratio" />
    </SystemFlex>
    <p>{{ label }}</p>
</SystemFlex>
</template>

<style scoped lang="scss">
.item {
    cursor: pointer;
}
</style>