<script setup lang="ts">
interface PropsInterface {
    shadow: boolean
}

const props = withDefaults(defineProps<PropsInterface>(), {
    shadow: true
})
</script>

<template>
<div :class="{ wrapper:true, wrapperShadow: shadow }">
    <slot></slot>
</div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: var(--pad-small);
    background-color: var(--dark);
    border-radius: var(--rad-small);

    display: flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: fit-content;
}

.wrapperShadow {
    box-shadow: var(--shadow);
}
</style>