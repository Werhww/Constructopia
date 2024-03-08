<script setup lang="ts">
interface Props {
    name: string
    tag?: string
    id: number
}

const props = withDefaults(defineProps<Props>(), {
    tag: "span"
})


</script>

<template>
<SystemAwaitHover v-slot="{ show }" >
    <div class="category">
        <component 
            class="categoryText light-greyThick" 
            ref="element" 
            :is="tag"
        >
            {{ name }},
        </component>

        <BuildCategoryPopup
            class="popup"
            :id="id"
            v-if="show"
        />
    </div>
</SystemAwaitHover>
</template>

<style scoped lang="scss">
.category {
    width: fit-content;
    height: fit-content;

    position: relative;
    transition: all 0.2s ease-in-out;
    .categoryText {
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover {
            color: var(--red);
        }
    }

    .popup {
        position: absolute;
        z-index: 100;
        top: 1.5rem;
    }
}
</style>