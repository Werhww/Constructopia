<script setup lang="ts">
import type { SystemSelect, DatePickerInput } from '#build/components';
import { OnClickOutside } from '@vueuse/components';

const props = defineProps<{
    chosenFilterItem: string
}>()

const emit = defineEmits<{
    createFilter: [item: string, operator: string, value: string | number | Date[]]
}>()


/* Select options */
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
            value: "gt",
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

const choiceOptions = [
    {
        value: "SMALL",
        label: "Small"
    },
    {
        value: "MEDUIM",
        label: "Medium"
    },
    {
        value: "LARGE",
        label: "Large"
    }
]

/* Elements */
const filterObjectElement = ref<InstanceType<typeof SystemSelect> | null>(null)
const fitlerOptionElement = ref<InstanceType<typeof SystemSelect> | null>(null)
const filterChoiceElement = ref<InstanceType<typeof SystemSelect> | null>(null)

const filterDateElement = ref<InstanceType<typeof DatePickerInput> | null>(null)

/* Values */
const currentFilterValue = ref(props.chosenFilterItem)
const currentFilterOperator = ref()


const dates = ref<Date[]>([new Date(2000, 1, 1)])
const choice = ref<string>()
const numberValue = ref<number>()

const foundFilterOperators = computed(() => {
    const foundType = filterOptionsList.find(item => item.value === currentFilterValue.value)?.type as keyof typeof filterOperators | undefined

    if(foundType) {
        return filterOperators[foundType]
    }
    return []
})


const validFilterDate = computed(() => {
    if(currentFilterValue.value == 'blockCount' || currentFilterValue.value == 'views') {
        if(!numberValue.value) return false
    }

    return true
})

function createFilter() {
    if(!validFilterDate.value) return
    const item = currentFilterValue.value
    const operator = currentFilterOperator.value
    const value = chooseValue()

    console.log(item, operator, value)

    emit('createFilter', item, operator, value)
    currentFilterValue.value = props.chosenFilterItem
}

function chooseValue(): string | number | Date[]{
    if(currentFilterValue.value == 'blockCount' || currentFilterValue.value == 'views') {
        return numberValue.value!
    } else if(currentFilterValue.value == 'size') {
        return choice.value!
    } else if(dates.value.length == 2) {
        return [dates.value[0], dates.value[1]]
    }
    
    return [dates.value[0]]

}

watch(dates, (newDate) => {
    console.log("date update")
    console.log(newDate)
})

watch(currentFilterOperator, (newOpeartor, oldOpeartor) => {
    if(newOpeartor == 'bt' && currentFilterValue.value == 'createdAt') {
        filterDateElement.value?.changeDateType("range")
    } else if(currentFilterValue.value == 'createdAt' && oldOpeartor == 'bt') {
        filterDateElement.value?.changeDateType("single")
    }
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

    <SystemInput v-if="currentFilterValue == 'blockCount' || currentFilterValue == 'views'" v-model="numberValue" class="inputField" type="number" height="1.875rem" placeholder="value"/>

    <OnClickOutside @trigger="filterChoiceElement?.closeSelect()" v-if="currentFilterValue == 'size'">
        <SystemSelect class="selectField" ref="filterChoiceElement" :options="choiceOptions" v-model="choice" shadow="off" width="10rem"/>
    </OnClickOutside>

    <DatePickerInput ref="filterDateElement"
        v-if="currentFilterValue == 'createdAt'" v-model="dates" 
        :is-range="false" 
        class="inputField" height="1.875rem" 
        :width="currentFilterOperator == 'bt' ? '20rem' : '10rem'"
        :depend-on-model-value="true"
    />
    
    <SystemFlex
        width="2rem"
        height="2rem"
        align-items="center"
        class="doneButton"
        @click="createFilter"
    >
        <SystemIcon src="/icons/done.svg" size="large" :color="validFilterDate ? 'white' : 'grey'"  />
    </SystemFlex>
</SystemFlex>
</template>

<style scoped lang="scss">
.inputField {
    margin:3px;
}

.selectField {
    margin: 0 3px;
}

.doneButton {
    cursor: pointer;
    padding-top: 4px;
}
</style>