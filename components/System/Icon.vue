<script setup lang="ts">
interface Props {
    src: string
    size: "tiny" | "small" | "medium" | "large"
    alt?: string
    ratio?: "equal" | "width" | "height"
    color?: "white" | "grey"
}

const props = withDefaults(defineProps<Props>(), {
    src: "",
    ratio: "equal",
    alt: "Icon",
    color: "white"
})

const size = computed(() => {
    switch (props.size) {
        case "tiny": 
            return "0.75rem"
        case "small":
            return "1rem"
        case "medium":
            return "1.25rem"
        case "large":
            return "1.875rem"
    }
})

const style = computed(() => {
    return {
        "--icon-width": props.ratio === "equal" ? size.value : props.ratio === "width" ? size.value : "auto",
        "--icon-height": props.ratio === "equal" ? size.value : props.ratio === "height" ? size.value : "auto",
        "--icon-filter": `var(--filter-${props.color})`
    }
})

</script>

<template>
<img class="icon" :src="src" :alt="alt" :style="style">
</template>

<style scoped lang="scss">
.icon {
    width: var(--icon-width);
    height: var(--icon-height);
    filter: var(--icon-filter);
}
</style>