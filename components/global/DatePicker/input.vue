<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';

interface Props {
    modelValue: Date[]

    isRange?: boolean
    width?: string
    height?: string
    maxDate?: Date
    minDate?: Date

    background?: string
    dependOnModelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isRange: false,
    width: "20rem",
    height: "2.25rem",

    background: "var(--background)"
})

const emit = defineEmits(["update:modelValue"])

defineExpose({
    changeDateType
})

const datePickerTopPlacement = computed(() => {
    const heightAsNumber = Number(props.height.replace('rem', ''))
    return `${heightAsNumber + .75}rem`
})

const isRangeState = ref(props.isRange)

const editingDate = ref({
    start: false,
    end: false,
})

const displayDate = ref<Date[]>(props.modelValue)
const datePickerDate = ref<Date[]>(props.modelValue)
const datePickerOpen = ref(false)

watch(datePickerDate, (newVal) => {
    if(newVal.length == 0) return

    if(editingDate.value.start) {
        displayDate.value = [newVal[0], displayDate.value[1]]
        return
    } else if(editingDate.value.end) {
        displayDate.value = [displayDate.value[0], newVal[0]]
        return
    }

    displayDate.value = newVal
    emit("update:modelValue", displayDate.value)
})

function compareDates(currentDate: Date, nextDate: Date) {
    const currentDateClone = new Date(currentDate.getTime())
    const nextDateClone = new Date(nextDate.getTime())

    currentDateClone.setHours(0,0,0,0)
    nextDateClone.setHours(0,0,0,0)

    const currentDateTimestamp = currentDateClone.getTime()
    const nextDateTimestamp = nextDateClone.getTime()

    if(currentDateTimestamp == nextDateTimestamp) return "same"
    else if(currentDateTimestamp > nextDateTimestamp) return "after"
    else if(currentDateTimestamp < nextDateTimestamp) return "before"
}

// For choosing editing side
function singleDateChange(whichDate: "start" | "end") {
    isRangeState.value = false
    
    if(whichDate == "start") {
        editingDate.value.start = true
        editingDate.value.end = false
        datePickerDate.value = [displayDate.value[0]]
    } else {
        editingDate.value.start = false
        editingDate.value.end = true
        datePickerDate.value = [displayDate.value[1]]
    }

    datePickerOpen.value = true
}

function resetEditingState() {
    editingDate.value.start = false
    editingDate.value.end = false
    isRangeState.value = props.isRange
}

// For changing between single and range date types
function changeDateType(type: "single" | "range") {
    if(type == "single") {
        if(isRangeState.value) {
            isRangeState.value = false
            datePickerDate.value = [displayDate.value[0]]
            return
        }
        return
    } 
    if("range") {
        let endDate = new Date()
        if(props.maxDate && compareDates(props.maxDate, endDate) == "before") endDate = props.maxDate

        if(props.modelValue?.length == 1) endDate = props.modelValue[0]


        let startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        if(props.minDate && compareDates(props.minDate, startDate) == "after") startDate = props.minDate

        isRangeState.value = true
        datePickerDate.value = [startDate, endDate]

    }

}
</script>

<template>
<div class="datePickerInput">
    <OnClickOutside @trigger="datePickerOpen = false">
        <div class="datePickerLabel" :date-range="isRangeState">
            <p
                :class="{
                    active: (datePickerOpen && editingDate.start) || (isRangeState && !editingDate.end && datePickerOpen)
                }"

                @click="singleDateChange('start')"    
            >{{ useDateFormat(displayDate[0] || new Date(2040, 1, 1), "MMM. D, YYYY", { locales: 'en-US' }).value }}</p>
            <img src="/icons/arrowRight.svg" alt="arrow right" v-if="isRangeState" @click="datePickerOpen = true, resetEditingState()">
            <p 
                v-if="isRangeState" 
                :class="{
                    active: (datePickerOpen && editingDate.end) || (isRangeState && !editingDate.start && datePickerOpen)
                }"
                @click="singleDateChange('end')"
            >{{ useDateFormat(displayDate[1] || new Date(2040, 1, 1), "MMM. D, YYYY", { locales: 'en-US' }).value }}</p>
            <SystemIcon 
                src="/icons/calendar.svg" 
                ratio="height" 
                size="medium"
                color="white"
                @click="datePickerOpen = true, resetEditingState()"
            />
        </div>


        <DatePicker class="datePicker" 
            v-model="datePickerDate" 
            v-if="datePickerOpen"
    
            :isRange="isRangeState"
            
            :maxDate="maxDate"
            :minDate="minDate"

            :depend-on-model-value="!!dependOnModelValue"
        />
    </OnClickOutside>
</div>
</template>

<style scoped lang="scss">
.datePickerInput {
    position: relative;
    width: fit-content;
}

.datePickerLabel {
    cursor: pointer;
    position: relative;

    background-color: v-bind(background);
    border-radius: var(--rad-small);
    height: v-bind(height);
    width: v-bind(width);
    padding: 0.625rem 0.75rem;

    display: flex;
    align-items: center;
    justify-content: space-between;

    &[date-range="false"] {
        gap: var(--gap-small);
        justify-content: center;

        p {
            width: auto;
            flex: 1;
            text-align: start;
        }
    }
    
    & > p {
        transition: color 200ms ease;
        width: 8rem;
        user-select: none;
        color: var(--grey);
        text-align: center;
    }

    .active {
        color: #fff;
    }
}

.datePicker {
    position: absolute;
    top: v-bind(datePickerTopPlacement);
    right: 0;
}
</style>