<script setup lang="ts">
interface PropsInterface {
    icon: string
    click?: () => void
    hoverText?: string
    
    changeIcon?: string
    reverseChange?: boolean
    disabled?: boolean
}

const props = withDefaults(defineProps<PropsInterface>(), {
    icon: '',
    hoverText: '',
    click: () => {},
    
    changeIcon: '',
    reverseChange: false,
    disabled: false
})

const currentIcon = ref(props.icon)
const hoverShown = ref(false)

let buttonTipsTimeout: null | NodeJS.Timeout = null

function showButtonTips() {
    buttonTipsTimeout = setTimeout(() => {
        hoverShown.value = true
        buttonTipsTimeout = null
    }, 600)
}

function hideButtonTips() {
    if (buttonTipsTimeout) {
        clearTimeout(buttonTipsTimeout)
    }

    hoverShown.value = false
}

function clicked() {
    if(props.disabled) return
    
    clearTimeout(buttonTipsTimeout!)
    hoverShown.value = false
    if (props.changeIcon) {
        if (props.reverseChange) {
            currentIcon.value == props.icon? currentIcon.value = props.changeIcon : currentIcon.value = props.icon
        }
        else currentIcon.value = props.changeIcon
    }

    props.click()
}
</script>

<template>
<ToolTip :text="hoverText" :shown="hoverShown" v-if="!!hoverText" />

<DarkWrapper class="iconButton" :data-disabled="disabled" @mouseenter="showButtonTips" @mouseleave="hideButtonTips" @click="clicked"  >
    <img :src="currentIcon" :alt="hoverText">
    <p></p>
</DarkWrapper>
</template>

<style scoped lang="scss">
.iconButton {
    cursor: pointer;
    
    & > img {
        height: 1.25rem;
    }

    &[data-disabled="true"] {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>