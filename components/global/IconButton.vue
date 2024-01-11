<script setup lang="ts">
interface PropsInterface {
    icon: string
    changeIcon?: string

    hoverText?: string
    activeChange?: boolean
}

const props = withDefaults(defineProps<PropsInterface>(), {
    icon: '',
    changeIcon: '',

    hoverText: '',
    activeChange: false
})

const currentIcon = ref(props.icon)
const hoverShown = ref(false)

let buttonTipsTimeout: null | NodeJS.Timeout = null

function showButtonTips() {
    buttonTipsTimeout = setTimeout(() => {
        hoverShown.value = true
        buttonTipsTimeout = null
    }, 300)
}

function hideButtonTips() {
    if (buttonTipsTimeout) {
        clearTimeout(buttonTipsTimeout)
    }

    hoverShown.value = false
}
</script>

<template>
<div class="iconButtonWrapper">
    <ToolTip :text="hoverText" :shown="hoverShown" />

    <DarkWrapper class="iconButton" @mouseenter="showButtonTips" @mouseleave="hideButtonTips"  >
        <img :src="currentIcon" :alt="hoverText">
    </DarkWrapper>
</div>
</template>

<style scoped lang="scss">
.iconButtonWrapper {
    position: relative;
}

.iconButton {
    cursor: pointer;
    
    & > img {
        height: 1.25rem;
    }
}
</style>