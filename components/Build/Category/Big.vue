<script setup lang="ts">
const props = defineProps<{
    category: string
    categoryId: string
}>()
</script>

<template>

<BuildCategoryPopup :category="category" :category-id="categoryId" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptates eaque iste omnis architecto, animi ea maxime. Quo eum accusamus id reiciendis atque? Soluta, quasi. Quia nesciunt non recusandae dicta.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam voluptates eaque iste omnis architecto, animi ea maxime. Quo eum accusamus id reiciendis atque? Soluta, quasi. Quia nesciunt non recusandae di">
    <SystemFlex class="category" align-item="center" justify-content="center">
        <span>{{ category }}</span>
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