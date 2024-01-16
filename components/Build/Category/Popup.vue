<script setup lang="ts">
import { useMouse } from '@vueuse/core';
const { x, y } = useMouse()

const props = defineProps<{
    categoryId: string
    category: string
    description: string
}>()

const popupShown = ref(false)
let buttonTipsTimeout: null | NodeJS.Timeout = null

function showButtonTips() {
    if(buttonTipsTimeout) {
        clearTimeout(buttonTipsTimeout)
        return
    }

    buttonTipsTimeout = setTimeout(() => {

        positionX.value = `${x.value + 5}px`
        positionY.value = `${y.value + 8}px`
        popupShown.value = true
        buttonTipsTimeout = null
    }, 600)
}

function hideButtonTips() {
    if (buttonTipsTimeout) {
        clearTimeout(buttonTipsTimeout)
    }

    buttonTipsTimeout = setTimeout(() => {
        popupShown.value = false
        buttonTipsTimeout = null
    }, 100)
}


const positionX = ref("10px")
const positionY = ref("10px")

</script>

<template>

<div @mouseenter="showButtonTips" @mouseleave="hideButtonTips">
    <slot></slot>

    <Transition name="hoverFadeIn">
        <SystemFlex class="popup" v-if="popupShown"
            direction="column" 
            background="dark" 
            padding="small"
            radius="small"
            shadow="on"
        
            width="15rem"
            height="10rem"
        
        >
            <SystemFlex
                direction="column"
                gap="small"
                grow="1"
            >
                <p>{{ category }}</p>
                <span class="description">{{ description }}</span>
            </SystemFlex>
            <span class="showMore">show more</span>
        </SystemFlex>
    </Transition>
</div>
</template>

<style scoped lang="scss">
.popup {
    z-index: 100;
    position: absolute;
    left: v-bind(positionX);
    top: v-bind(positionY);
    user-select: none;
    

    p {
        font-weight: 700;
        color: var(--grey);
    }

    span {
        font-weight: 500;
        color: var(--grey);
    }

    .showMore {
        color: #fff;
        text-decoration: underline;
        text-underline-offset: 0.2rem;
        cursor: pointer;
    }

    .description {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
    }
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