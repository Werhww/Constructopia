<script setup lang="ts">
interface Props {
    timeout: number

}

const props = withDefaults(defineProps<Props>(), {
    timeout: 500
})

const show = ref(false)

const hoverRef = ref<HTMLElement | null>(null)
const mouse = useMouseInElement(hoverRef)

watchEffect(() => {
    if(mouse.isOutside.value) {
        setTimeout(() => {
            show.value = false
        }, props.timeout)
    } else {
        show.value = true
    }
})


watchEffect(() => {
    console.log(mouse.isOutside.value)
})
</script>

<template>
<div ref="hoverRef" :style="{
    height: 'fit-content',
    width: 'fit-content'
}">
    <slot :show="show"></slot>
</div>
</template>

<style scoped lang="scss">

</style>