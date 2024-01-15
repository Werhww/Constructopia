<script setup lang="ts">
const props = defineProps<{
    userName: string
    userId: string
}>()
</script>

<template>
<p class="userAt">@{{ userName }}</p>
</template>

<style scoped lang="scss">
.userAt {
    color: var(--grey);
    cursor: pointer;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #fff;
    }
}
</style>