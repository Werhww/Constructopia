<script setup lang="ts">
const props = defineProps<{
    chosenFilterItem: string
}>()

import type { SystemSelect } from '#build/components';
import { OnClickOutside } from '@vueuse/components';

/* Create new filter */
const filterOptionsList = [
    {
        value: "blockCount",
        type: "number",
        label: "Blocks"
    },
    {
        value: "views",
        type: "number",
        label: "Views"
    },
    {
        value: "size",
        type: "choice",
        label: "Size"
    },
    {
        value: "createdAt",
        type: "date",
        label: "Created"
    },
]

const filterOperators = {
    number: [
        {
            value: "lt",
            label: "Less than"
        },
        {
            value: "lte",
            label: "Less than or equal to"
        },
        {
            value: "gt",
            label: "Greater than"
        },
        {
            value: "gte",
            label: "Greater than or equal to"
        }
    ],
    choice: [
        {
            value: "ex",
            label: "Exclude"
        },
        {
            value: "bt",
            label: "Bigger than"
        },
        {
            value: "lt",
            label: "Less than"
        },
        {
            value: "eq",
            label: "Equal to"
        }
    ],
    date: [
        {
            value: "lte",
            label: "Older than"
        },
        {
            value: "gte",
            label: "Newer than"
        },
        {
            value: "eq",
            label: "Equal to"
        },
        {
            value: "bt",
            label: "Between"
        }
    ]
}

const currentFilterValue = ref(props.chosenFilterItem)

const currentFilterOperator = ref()
const foundFilterOperators = computed(() => {
    const foundType = filterOptionsList.find(item => item.value === currentFilterValue.value)?.type as keyof typeof filterOperators | undefined

    if(foundType) {
        return filterOperators[foundType]
    }
    return []
})

const filterObjectElement = ref<InstanceType<typeof SystemSelect> | null>(null)
const fitlerOptionElement = ref<InstanceType<typeof SystemSelect> | null>(null)


const test = ref(false)
const range = ref({
    start: new Date(),
    end: new Date(2024,0,10)
})
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
        <SystemSelect ref="fitlerOptionElement"  :options="foundFilterOperators" v-model="currentFilterOperator" shadow="off" :long-dropdown="true" width="14rem" />
    </OnClickOutside>
    <SystemInput v-if="currentFilterValue == 'blockCount' || currentFilterValue == 'views'" class="inputField" type="number" height="1.875rem" placeholder="value"/>
    
    
    <SystemInput v-if="currentFilterValue == 'createdAt'" class="inputField" type="date" height="1.875rem" placeholder="value"/>

</SystemFlex>
</template>

<style scoped lang="scss">
.inputField {
    margin: 3px;
}
</style>