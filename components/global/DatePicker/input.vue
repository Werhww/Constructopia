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
}

const props = withDefaults(defineProps<Props>(), {
    isRange: false,
    width: "20rem",
    height: "2.25rem",

    background: "var(--background)"
})

const editingDate = ref({
    start: false,
    end: false,
    isRange: props.isRange
})

const displayDate = ref<Date[]>([])
const datePickerDate = ref<Date[]>([])

const datePickerTopPlacement = computed(() => {
    const heightAsNumber = Number(props.height.replace('rem', ''))
    return `${heightAsNumber + .75}rem`
})

watch(() => props.isRange, (newVal) => {
    if(datePickerDate.value.length == 0) return
    console.log("isRange", newVal)
    const startDate = new Date(datePickerDate.value[0].getTime() - 7 * 24 * 60 * 60 * 1000)
    const endDate = datePickerDate.value[0]

    datePickerDate.value = [
        startDate,
        endDate
    ]

    /* editingDate.value.isRange = newVal */
})

watch([() => editingDate.value.isRange, () => editingDate.value.start, () => editingDate.value.end], ([isRange, start, end]) => {
    if(!props.isRange) return
    if(isRange) return datePickerDate.value = displayDate.value

    console.log("editingDate", isRange, start, end)
    console.log(datePickerDate.value)
    console.log(displayDate.value)

    if(start) {
        datePickerDate.value = [displayDate.value[0]]
        console.log(displayDate.value[0])
    } else if(end) {
        datePickerDate.value = [displayDate.value[1]]
        console.log(displayDate.value[1])
    }
})

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
})


const datePickerOpen = ref(false)

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

function startSingelDateChange(whichDate: "start" | "end" | "reset") {
    if(whichDate == "reset") {
        editingDate.value.isRange = props.isRange
        editingDate.value.start = false
        editingDate.value.end = false
        return
    }

    editingDate.value.isRange = false
    if(whichDate == "start") {
        editingDate.value.start = true
        editingDate.value.end = false
    } else {
        editingDate.value.start = false
        editingDate.value.end = true
    }

    datePickerOpen.value = true
}
</script>

<template>
<div class="datePickerInput">
    <OnClickOutside @trigger="datePickerOpen = false">
        <div class="datePickerLabel" :date-range="isRange">
            <p
                :class="{
                    active: (datePickerOpen && editingDate.start) || (isRange && !editingDate.end && datePickerOpen)
                }"

                @click="startSingelDateChange('start')"    
            >{{ useDateFormat(displayDate[0], "MMM. D, YYYY", { locales: 'en-US' }).value }}</p>
            <img src="/icons/arrowRight.svg" alt="arrow right" v-if="isRange" @click="datePickerOpen = true, startSingelDateChange('reset')">
            <p 
                v-if="isRange" 
                :class="{
                    active: (datePickerOpen && editingDate.end) || (isRange && !editingDate.start && datePickerOpen)
                }"
                @click="startSingelDateChange('end')"
            >{{ useDateFormat(displayDate[1], "MMM. D, YYYY", { locales: 'en-US' }).value }}</p>
            <SystemIcon 
                src="/icons/calendar.svg" 
                ratio="height" 
                size="medium"
                color="white"
                @click="datePickerOpen = true, startSingelDateChange('reset')"
            />
        </div>


        <DatePicker class="datePicker" 
            v-model="datePickerDate" 
            v-if="datePickerOpen"
    
            :isRange="editingDate.isRange"
            
            :maxDate="maxDate"
            :minDate="minDate"
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