<script setup lang="ts">
const props = defineProps<{
    categorys: {
        name: string
        id: string
    }[]

    animationOn: boolean
}>()

import type { BuildCategoryPopup } from '#build/components';
let popupTimeout: null | NodeJS.Timeout = null
let hideTimeout: null | NodeJS.Timeout = null

function showPopup(id: string, name: string) {
    let timeoutTime = 500

    if(hideTimeout) {
        clearTimeout(hideTimeout)
        timeoutTime = 100
    }

    popupTimeout = setTimeout(() => {
        categoryPopupName.value = name
        categoryPopupId.value = id
        popupElement.value?.showButtonTips()
        popupTimeout = null
    }, timeoutTime)
}

function hidePopup() {
    if(popupTimeout) {
        clearTimeout(popupTimeout)
    }

    hideTimeout = setTimeout(() => {
        popupElement.value?.hideButtonTips()
        popupTimeout = null
    }, 100)
}

function popupHover() {
    if(hideTimeout) {
        clearTimeout(hideTimeout)
    }   

    pauseAnimation.value = true
}


const categoryPopupName = ref("")
const categoryPopupId = ref("")
const popupElement = ref<InstanceType<typeof BuildCategoryPopup> | null>(null)
const pauseAnimation = ref(false)
</script>

<template>
<div class="categorys">
    <BuildCategoryPopup @mouseenter="popupHover" @mouseleave="pauseAnimation = false; hidePopup()" :id="categoryPopupId" ref="popupElement" :timeout="1" :hide-timeout="1" />
    <div class="scrollerWrapper">
        <SystemFlex class="categorysInner"
            gap="small"
            flex="nowrap"
            width="max-content"
    
            :data-animate="animationOn"
            :data-pause="pauseAnimation"
        >
            <BuildCategorySmall v-for="item in categorys" @mouseenter="showPopup(item.id, item.name)" @mouseleave="hidePopup" :name="item.name" :id="item.id" />
            <BuildCategorySmall v-for="item in categorys" @mouseenter="showPopup(item.id, item.name)" @mouseleave="hidePopup" :name="item.name" :id="item.id" aria-hidden="true" />
        </SystemFlex>
    </div>
</div>
</template>

<style scoped lang="scss">
.categorys { 

    .categorysInner {
        position: unset;
        animation: scroll 15s linear infinite;

        &:hover {
            animation-play-state: paused;
        }

        &[data-animate="false"] {
            animation-play-state: paused;
        }

        &[data-pause="true"] {
            animation-play-state: paused;
        }

        div {
            cursor: pointer;
        }
    }

    .scrollerWrapper {
        width: 100%;

        mask: linear-gradient(to right, transparent, var(--background) 5%, var(--background) 95%, transparent); 
    }

    @keyframes scroll {
        to {
            transform: translate(calc(-50% - calc(var(--gap-small) / 2)));
        }        
    }
}
</style>