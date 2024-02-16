<script setup lang="ts">
interface Props {
    name: string
    id: string
    tag?: string
}

const props = withDefaults(defineProps<Props>(), {
    tag: "span"
})

const emit = defineEmits<{
    popup: [x:number, y:number, id: string]
    close: []
}>()

const element = ref<HTMLElement | null>(null)

let timeout: null | NodeJS.Timeout = null

function mouseover() {
    timeout = setTimeout(() => {
        const top = element.value?.offsetTop
        const left = element.value?.offsetLeft
        emit("popup", left || 0, top || 0, props.id)
        timeout = null
    }, 500)
}

function mouseout() {
    if(timeout) {
        clearTimeout(timeout)
    }
    emit("close")
}

</script>

<template>
<component 
    class="category light-greyThick" 
    ref="element" 
    :is="tag"

    @mouseover="mouseover"
    @mouseout="mouseout"
>
    {{ name }},
</component>
</template>

<style scoped lang="scss">
.category {
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
        
    &:hover {
        color: var(--red);
    }
}
</style>