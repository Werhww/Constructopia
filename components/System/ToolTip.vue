<script setup lang="ts">
import { useMouse } from '@vueuse/core';

const { x, y } = useMouse()
const props  = withDefaults(defineProps<{
    text: string
    timeout?: number
    click?: () => void
}>(), {
    click: () => {},
    timeout: 600
})

const toolTipShown = ref(false)
let buttonTipsTimeout: null | NodeJS.Timeout = null

function showButtonTips() {
    if(props.text == "") return

    buttonTipsTimeout = setTimeout(() => {

        positionX.value = `${x.value + 10}px`
        positionY.value = `${y.value + 15}px`
        toolTipShown.value = true
        buttonTipsTimeout = null
    }, props.timeout)
}

function hideButtonTips() {
    if(props.text == "") return
    if (buttonTipsTimeout) {
        clearTimeout(buttonTipsTimeout)
    }

    toolTipShown.value = false
}

function clicked() {
    toolTipShown.value = false
    props.click()
}

const positionX = ref("10px")
const positionY = ref("10px")
</script>

<template>
<Transition name="hoverFadeIn">
    <SystemFlex v-if="toolTipShown" class="buttonHover"
        shadow="on"
        padding="small"
        radius="small"

        background="dark"
    >
        <span>{{ text }}</span>
    </SystemFlex>
</Transition>

<div @mouseenter="showButtonTips" @mouseleave="hideButtonTips" @click="clicked" >
    <slot></slot>
</div>
</template>

<style scoped lang="scss">
.buttonHover {
    z-index: 100;
    position: absolute;
    top: v-bind(positionY);
    left: v-bind(positionX);
    user-select: none;
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