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
    defaultValue: string 
    title: string
    excludeChoose?: boolean
    showChoosen?: boolean
}>()

import { OnClickOutside } from '@vueuse/components';

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
        <FilterDropdownItem v-if="showChoosen" src="/icons/blocks.svg" label="Blocks" size="medium" ratio="height"  />
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
            height="8.75rem"
            overflow="hidden"
            v-show="open"
        >
            <FilterDropdownItem src="/icons/blocks.svg" label="Blocks" size="medium" ratio="height"  />
            <FilterDropdownItem src="/icons/editPen.svg" label="Last edit" size="medium" ratio="equal"  />
            <FilterDropdownItem src="/icons/views.svg" label="Views" size="medium" ratio="width"  />
            <FilterDropdownItem src="/icons/size.svg" label="Size" size="medium" ratio="height" />
            <FilterDropdownItem src="/icons/editCalendar.svg" label="Created" size="medium" ratio="equal" />
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