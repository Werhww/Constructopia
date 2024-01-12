<script setup lang="ts">
import { useMouse } from '@vueuse/core';

const { x, y } = useMouse()
const props = defineProps<{
    text: string
    shown: boolean
}>()

const positionX = ref("10px")
const positionY = ref("10px")

watch(() => props.shown, (shown) => {
    if (shown) {
        positionX.value = `${x.value + 10}px`
        positionY.value = `${y.value + 15}px`
    }
})
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
    z-index: 100;
    position: absolute;
    top: v-bind(positionY);
    left: v-bind(positionX);
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