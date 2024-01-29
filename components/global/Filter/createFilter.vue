<script setup lang="ts">
defineProps<{
    chosenFilterItem: string
}>()

import type { SystemSelect } from '#build/components';
import { OnClickOutside } from '@vueuse/components';

/* Create new filter */
const filterOptionsList = [
    {
        value: "blockCount",
        label: "Blocks"
    },
    {
        value: "updatedAt",
        label: "Last edit"
    },
    {
        value: "Blocks",
        label: "Views"
    },
    {
        value: "Blocks",
        label: "Views"
    },
    {
        value: "Blocks",
        label: "blocks"
    },
]
const currentFilterValue = ref(filterOptionsList[0].value)


const filterObjectElement = ref<InstanceType<typeof SystemSelect> | null>(null)
const fitlerOptionElement = ref<InstanceType<typeof SystemSelect> | null>(null)

</script>

<template>
<SystemFlex class="createFilter"
    background="dark"
    radius="small"
    shadow="on"
>
    <OnClickOutside @trigger="filterObjectElement?.closeSelect()">
        <SystemSelect ref="filterObjectElement" :options="filterOptionsList" v-model="currentFilterValue" shadow="off"/>
    </OnClickOutside>
    <OnClickOutside @trigger="fitlerOptionElement?.closeSelect()">
        <SystemSelect ref="fitlerOptionElement"  :options="filterOptionsList" v-model="currentFilterValue" shadow="off" />
    </OnClickOutside>
</SystemFlex>
</template>

<style scoped lang="scss">

</style>