<template>
<div class="new-category">
    <ComponentInput 
        placeholder="category name" 
        width="5rem"
        font_size="1.5rem"
        :maxlength="20"
        v-model="prop.seach"
    >
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    seach: string
}>()
</script>

<style scoped>
.new-category {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
}
</style>