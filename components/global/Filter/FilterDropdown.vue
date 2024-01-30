<script setup lang="ts">
interface FilterDropdownItemProps {
    src: string
    label: string
    value: string
    size: "tiny" | "small" | "medium"
    ratio: "equal" | "width" | "height"
}

const props = defineProps<{
    options: FilterDropdownItemProps[]
    modelValue?: string 
    title: string
    excludeChoose?: boolean
    showChoosen?: boolean
}>()

defineEmits(["update:modelValue"])

import { OnClickOutside } from '@vueuse/components';

const filteredList = computed(() => {
    if(!props.excludeChoose) return props.options
    return props.options.filter(option => option.value !== props.modelValue)
})

const currentOption = computed(() => {
    if(!props.modelValue || !props.showChoosen) return { src: "", label: "", size: "medium", ratio: "equal", value: ""} as FilterDropdownItemProps
    return props.options.find(option => option.value === props.modelValue) as FilterDropdownItemProps
})


const optionsHeight = computed(() => {
    let fullHeight = (props.options.length * 1.625) + 0.625
    if(props.excludeChoose) fullHeight -= 1.625
    return `${fullHeight}rem`
})

const open = ref(false)
</script>

<template>
<OnClickOutside @trigger="open = false">
    <SystemFlex class="pointer"
        width="100%"
        align-items="center"
        justify-content="space-between"
        @click="open = !open"
    >
        <p>{{ title }}</p>
        <FilterDropdownItem v-if="showChoosen" :src="currentOption?.src" :label="currentOption?.label" :size="currentOption?.size" :ratio="currentOption?.ratio"  />
        <SystemIcon class="expand" :data-open="open" src="/icons/expand.svg" size="tiny" ratio="width" />
    </SystemFlex>
    <Transition
        name="expand"
        mode="out-in"
    >
        <SystemFlex
            gap="small"
            padding="small"
            direction="column"
            :height="optionsHeight"
            overflow="hidden"
            v-show="open"
        >
            <FilterDropdownItem v-for="item in filteredList" @click="$emit('update:modelValue', item.value)" :src="item.src" :label="item.label" :size="item.size" :ratio="item.ratio" />
        </SystemFlex>
    </Transition>
</OnClickOutside>
</template>

<style scoped lang="scss">
.pointer {
    cursor: pointer;
}

.expand {
    transition: all 0.5s ease;
    rotate: -90deg;

    &[data-open="true"] {
        rotate: 0deg;
    }
}


/* Dropdown menus animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease;
}

.expand-enter-from,
.expand-leave-to {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
}
</style>