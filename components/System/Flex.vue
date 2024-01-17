<script setup lang="ts">
interface FlexTypes {
    tag?: string
    gap?: "none" | "small" | "normal" | "big" | "tiny"
    radius?: "none" | "outer" | "inner" | "small"
    padding?:   "none" |  "normal" | "small"
    background?: "none" | "background" | "dark" | "grey" 

    shadow?: "on" | "off"

    direction?: "row" | "row-reverse" | "column" | "column-reverse" | "initial" | "inherit"
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit" 
    alignItems?: "normal" | "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit" 
    justifySelf?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit" | "auto"
    alignSelf?: "normal" | "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit" | "auto"
    overflow?: "visible" | "hidden" | "scroll" | "auto" 


    wrap?: "nowrap" | "wrap" | "wrap-reverse" | "initial" | "inherit"
    flex?: string

    width?: string
    height?: string
}

const props = withDefaults(defineProps<FlexTypes>(), {
    tag: "div",

    gap: "none",
    radius: "none",
    padding: "none",
    background: "none",
    shadow: "off",

    direction: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    alignSelf: "auto",
    justifySelf: "auto",
    wrap: "nowrap",
    overflow: "visible",

    flex: "0 1 auto",
    height: "auto",
    width: "auto"
})

const style = computed(() => {
    return {
        "--radius": `var(--rad-${props.radius})`,
        "--padding": `var(--pad-${props.padding})`,
        "--background-color": `var(--${props.background})`,
        
        "--gap": `var(--gap-${props.gap})`,
        "--flex-direction": props.direction,
        "--align-items": props.alignItems,
        "--justify-content": props.justifyContent,
        "--wrap": props.wrap,
        "--flex": props.flex,
        "--align-self": props.alignSelf,
        "--justify-self": props.justifySelf,
        "--overflow": props.overflow,

        "--height": props.height,
        "--width": props.width,
    }
})

</script>

<template>
    <component class="flex" :is="props.tag" :data-shadow="shadow" :style="style">
        <slot></slot>
    </component>
</template>

<style scoped lang="scss">
.flex {
    display: flex;
    
    background-color: var(--background-color);
    border-radius: var(--radius);
    padding: var(--padding);

    gap: var(--gap);
    flex-direction: var(--flex-direction);
    align-items: var(--align-items);
    justify-content: var(--justify-content);
    
    align-self: var(--align-self);
    justify-self: var(--justify-self);
    flex-wrap: var(--wrap);
    flex: var(--flex);
    overflow: var(--overflow);
    
    height: var(--height);
    width: var(--width);

    &[data-shadow="on"] {
        box-shadow: var(--shadow);
    }
}
</style>