<script setup lang="ts">
const props = defineProps<{
    name: string
    id: string
}>()
</script>

<template>
<BuildCategoryPopup :category="name" :category-id="id" description="test123">
    <SystemFlex class="category" align-items="center" justify-content="center">
        <span>{{ name }}</span>
    </SystemFlex>
</BuildCategoryPopup>
</template>

<style scoped lang="scss">
.category {
    padding: 0.1232151235rem var(--pad-small);
    border-radius: var(--rad-small);
    border: 2px solid var(--grey);
    width: fit-content;
    

    span {
        transition: all 0.2s ease-in-out;
        color: var(--grey);
        font-weight: 600;
    }


    transition: all 0.2s ease-in-out;

    &:hover {
        border-color: var(--grey-dark);

        span {
            color: var(--grey-dark);
        }
    }
}
</style>