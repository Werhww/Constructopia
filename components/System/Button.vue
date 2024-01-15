<script setup lang="ts">
interface Props {
    icon?: string
    text?: string

    changeIcon?: string
    changeText?: string

    click?: () => void
    hoverText?: string
    
    reverseChange?: boolean
    disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    icon: undefined,
    text: undefined,

    changeIcon: "",
    changeText: "",

    click: () => {},
    hoverText: "",
    
    reverseChange: false,
    disabled: false
})

const currentIcon = ref(props.icon)
const currentText = ref(props.text)

function clicked() {
    if(props.disabled) return
    
    if (props.changeIcon) {
        if (props.reverseChange) {
            currentIcon.value == props.icon? currentIcon.value = props.changeIcon : currentIcon.value = props.icon
        }
        else currentIcon.value = props.changeIcon
    }

    if (props.changeText) {
        if (props.reverseChange) {
            currentText.value == props.text? currentText.value = props.changeText : currentText.value = props.text
        }
        else currentText.value = props.changeText
    }

    props.click()
}
</script>

<template>
    <SystemToolTip :text="hoverText" :click="clicked"> 
        <SystemFlex class="iconButton"
            shadow="on" 
            padding="small" 
            background="dark" 
            radius="small" 
            align-item="center" 
            justify-content="center"
            width="fit-content" 
            height="fit-content"
        
            gap="small"
        >
            <img :src="currentIcon" v-if="icon">
            <p v-if="text">{{ currentText }}</p>
        </SystemFlex>
    </SystemToolTip>
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