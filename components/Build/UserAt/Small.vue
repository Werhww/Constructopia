<script setup lang="ts">
const props = defineProps<{
    username: string
    userId: string
}>()
</script>

<template>
<span class="userAt">@{{ username }}</span>
</template>

<style scoped lang="scss">
.userAt {
    color: var(--grey);
    cursor: pointer;
    font-weight: 500;

    transition: color 0.2s ease-in-out;

    &:hover {

        color: var(--red);
    }
}
</style>