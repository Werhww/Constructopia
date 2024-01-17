<script setup lang="ts">
const props = defineProps<{
    categorys: {
        name: string
        id: string
    }[]

    animationOn: boolean
}>()

import { usePreferredReducedMotion } from '@vueuse/core';
const motion = usePreferredReducedMotion()

const translate = ref(0)
const increment = (50 - (0.377 / 2)) / 1500

let movementInterval: NodeJS.Timeout | null = null 

function animate() {
    console.log('animate')
    movementInterval = setInterval(() => {
        if (translate.value < -50) {
            translate.value = 0
        }

        translate.value -= increment
    }, 10)  
}
watch(() => [props.animationOn, motion], ([animationOn, motion]) => {
    if(motion !== 'reduce') {
        return
    }

    if (newVal) {
        animate()
    } else {
        clearInterval(movementInterval!)
        translate.value = 0
    }
})

onMounted(() => {
    if (motion.value !== 'reduce') {
        animate()
        
    } else {
        if (movementInterval) {
            clearInterval(movementInterval)
        }
    }
})
</script>

<template>
<SystemFlex class="categorys"
    gap="small"
    :data-motion="motion"
> 
    <div class="categorysInner" ref="categoryContainer" :style="`transform: translate(${translate}%)`">
        <BuildCategorySmall v-for="item in categorys" :name="item.name" :id="item.id" />
        <BuildCategorySmall v-for="item in categorys" :name="item.name" :id="item.id" aria-hidden="true" />
    </div>
</SystemFlex>
</template>

<style scoped lang="scss">
.categorys {    
    .categorysInner {
        display: flex;
        gap: var(--gap-small);
        flex-wrap: nowrap;
        width: max-content;
    }

    mask: linear-gradient(to right, transparent, var(--background) 5%, var(--background) 95%, transparent);

    &[data-motion="reduce"] {
        mask: none;

        .categorysInner {
            transform: none;
            flex-wrap: wrap;
        }
    }


}
</style>