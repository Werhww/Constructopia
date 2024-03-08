<script setup lang="ts">
interface Props {
    username: string | undefined
    userId: number | undefined
    tag?: string
}

withDefaults(defineProps<Props>(), {
    tag: "span",
})

</script>

<template>
    <component :is="tag" class="greyThick username">
        @{{ username }}
    </component>
</template>

<style scoped lang="scss">
.username {
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
        color: var(--red);
    }
}
</style>