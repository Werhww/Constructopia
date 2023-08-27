<template>
<div class="choosen-categorys">
    <BuildOpenCategory v-for="cat in categorys" :key="cat" :name="cat" />
</div>
</template>

<script setup lang="ts">
defineProps<{
    categorys: string[]
}>()
</script>

<style scoped>
.choosen-categorys {
    width: 42.5rem;
    display: flex;
    gap: 0.625rem;
    flex-wrap: wrap;
}
</style>