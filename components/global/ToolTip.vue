<script setup lang="ts">
const props = defineProps<{
    text: string
    shown: boolean
}>()
</script>

<template>
<Transition name="hoverFadeIn">
    <DarkWrapper class="buttonHover" v-if="shown">
        <span>{{ text }}</span>
    </DarkWrapper>
</Transition>
</template>

<style scoped lang="scss">
.buttonHover {
    position: absolute;
    top: -1.8rem;
    right: -2.5rem;
}

.hoverFadeIn-enter-active,
.hoverFadeIn-leave-active {
  transition: opacity 100ms ease;
}

.hoverFadeIn-enter-from,
.hoverFadeIn-leave-to {
  opacity: 0;
}

</style>