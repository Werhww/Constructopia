<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';

interface Props {
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
const datePickerDate = ref<Date[]>([])

const editingDate = ref({
    start: false,
    end: false,
    isRange: props.isRange
})
const currentDatePickerValue = ref<Date | Date[]>()

const datePickerTopPlacement = computed(() => {
    const heightAsNumber = Number(props.height.replace('rem', ''))
    return `${heightAsNumber + .75}rem`
})

watch(currentDatePickerValue, (newVal) => {
    if(!newVal) return
    if(props.isRange != editingDate.value.isRange && !Array.isArray(newVal)) {
        if(editingDate.value.start) {
            if(compareDates(newVal, datePickerDate.value[1]) == "after") {
                datePickerDate.value = [datePickerDate.value[1], newVal]
                editingDate.value.start = false
                editingDate.value.end = true
                
                return
            }

            datePickerDate.value = [newVal, datePickerDate.value[1]]
        } else if(editingDate.value.end) {
            if(compareDates(newVal, datePickerDate.value[0]) == "before") {
                datePickerDate.value = [newVal, datePickerDate.value[0]]
                editingDate.value.start = true
                editingDate.value.end = false
                
                return
            }


            datePickerDate.value = [datePickerDate.value[0], newVal]
        }
    } else {
        datePickerDate.value = Array.isArray(newVal) ? newVal : [newVal]
    }
})

watch(() => editingDate.value.isRange, (newVal) => {
    if(newVal && props.isRange) {
        currentDatePickerValue.value = datePickerDate.value
    }
})

const datePickerOpen = ref(false)

onMounted(() => {
    if(props.isRange) {
        let endDate = new Date()
        if(props.maxDate && compareDates(props.maxDate, endDate) == "before") endDate = props.maxDate

        let startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000)
        if(props.minDate && compareDates(props.minDate, startDate) == "after") startDate = props.minDate
        datePickerDate.value = [startDate, endDate]
        console.log('datePickerDate.value', datePickerDate.value)
    } else {
        if(props.maxDate && compareDates(props.maxDate, new Date()) == "before") datePickerDate.value = [props.maxDate]
        else if (props.minDate && compareDates(props.minDate, new Date()) == "after") datePickerDate.value = [props.minDate]
        else  datePickerDate.value = [new Date()]
    }
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
        currentDatePickerValue.value = datePickerDate.value[0]
    } else {
        editingDate.value.start = false
        editingDate.value.end = true
        currentDatePickerValue.value = datePickerDate.value[1]
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
            >{{ useDateFormat(datePickerDate[0], "MMM. D, YYYY", { locales: 'en-US' }).value }}</p>
            <img src="/icons/arrowRight.svg" alt="arrow right" v-if="isRange" @click="datePickerOpen = true, startSingelDateChange('reset')">
            <p 
                v-if="isRange" 
                :class="{
                    active: (datePickerOpen && editingDate.end) || (isRange && !editingDate.start && datePickerOpen)
                }"
                @click="startSingelDateChange('end')"
            >{{ useDateFormat(datePickerDate[1], "MMM. D, YYYY", { locales: 'en-US' }).value }}</p>
            <SystemIcon 
                src="/icons/calendar.svg" 
                ratio="height" 
                size="medium"
                color="white"
                @click="datePickerOpen = true, startSingelDateChange('reset')"
            />
        </div>


        <DatePicker class="datePicker" 
            v-model="currentDatePickerValue" 
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