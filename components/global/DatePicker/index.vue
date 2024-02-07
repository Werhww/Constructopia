<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';

interface Props {
    isRange?: boolean
    maxDate?: Date
    minDate?: Date
    modelValue?: Date | [Date, Date]
}

const prop = withDefaults(defineProps<Props>(), {
    isRange: false
})

const emit = defineEmits(["update:modelValue"])

const currentYear = ref(new Date().getFullYear()) 
const currentMonth = ref(new Date().getMonth())

/* For day selection */
const selectedDate = computed(() => {
    if(prop.isRange) return new Date()
    if(prop.modelValue  && !Array.isArray(prop.modelValue)) return prop.modelValue
    emit("update:modelValue", new Date())
    return new Date()
})

const selectedDateRange = computed(() => {
    if(!prop.isRange) return [new Date(), new Date()]
    if(prop.modelValue && Array.isArray(prop.modelValue)) return prop.modelValue
    emit("update:modelValue", [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()])
    return [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]
})

/* For range selection */
const oldRangeDate = ref()
const movingRange = ref({ start: false, end: false })

/* Calculate calender days */
const monthDayList = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value 

    const dateMonth = new Date(year, month + 1, 0) // + 1 to get the last day of the month current month when date is 0
    const daysInMonth = dateMonth.getDate()
    const lastDay = dateMonth.getDay();

    const firstDay = new Date(year, month, 1).getDay()
    const daysInLastMonth = new Date(year, month, 0).getDate()

    const days = []

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i)
        const marking = checkMarking(date)

        const inThisMonth = {
            isThisMonth: true,
            overflowStart: false, 
            overflowEnd: false
        }

        let inDateRange = isInDateRange(date, "current")
        days.push({day: i, date, ...marking, ...inThisMonth, inDateRange})
    }

    if(firstDay !== 1) { // 1 = monday so no need to add
        const inThisMonth = {
            isThisMonth: false,
            overflowStart: true, 
            overflowEnd: false
        }

        if(firstDay == 0) {
            for(let i = 0; i < 6; i++) {
                const date = new Date(year, month - 1, daysInLastMonth - i)
                const marking = checkMarking(date)

                let inDateRange = isInDateRange(date, "previous")
                days.unshift({day: daysInLastMonth - i, date, ...marking, ...inThisMonth, inDateRange})
            } 
        } else {
            for(let i = 0; i < firstDay - 1; i++) {
                const date = new Date(year, month - 1, daysInLastMonth - i)
                const marking = checkMarking(date)

                let inDateRange = isInDateRange(date, "previous") 
                days.unshift({day: daysInLastMonth - i, date, ...marking, ...inThisMonth, inDateRange})
            }  
        }
        
    }

    if (lastDay !== 0) { // 0 = sunday so no need to add
        const inThisMonth = {
            isThisMonth: false,
            overflowStart: false, 
            overflowEnd: true
        }

        for (let i = 1; i <= 7 - lastDay; i++) {
            const date = new Date(year, month + 1, i)
            const marking = checkMarking(date)

            let inDateRange = isInDateRange(date, "next")
             
            days.push({ day: i, date, ...marking, ...inThisMonth, inDateRange})
        }
    }

    return days
})

/* Utils */
function isInDateRange(date: Date, month: "next" | "previous" | "current") {
    if(month == "current") {
        let inMaxRange = true
        let inMinRange = true

        if(prop.maxDate) {
            inMaxRange = compareDates(date, prop.maxDate) == "before" || compareDates(date, prop.maxDate) == "same"
        }

        if(prop.minDate) {
            inMinRange = compareDates(date, prop.minDate) == "after" || compareDates(date, prop.minDate) == "same"
        }

        return inMaxRange && inMinRange
    }

    if(month == "next" && prop.maxDate) return compareDates(date, prop.maxDate) == "before" || compareDates(date, prop.maxDate) == "same"
    if(month == "previous" && prop.minDate) return compareDates(date, prop.minDate) == "after" || compareDates(date, prop.minDate) == "same"

    return true
}

function changeMonth(direction: "next" | "previous") {
    if(direction == "next") {
        if(currentMonth.value == 11) {    
            if(!dateValid(new Date(currentYear.value + 1, 0, 1), "next")) return

            return currentYear.value++,  currentMonth.value = 0
        }

        if(!dateValid(new Date(currentYear.value, currentMonth.value + 1, 1), "next")) return
        return currentMonth.value++
    }

    if(direction == "previous") {
        if(currentMonth.value == 0) {
            if(!dateValid(new Date(currentYear.value, 11, 1), "previous")) return


            return currentYear.value--, currentMonth.value = 11
        }
        if(!dateValid(new Date(currentYear.value, currentMonth.value , 1), "previous")) return
        return currentMonth.value--
    }
}

function dateValid(date: Date, direction: "next" | "previous") {
    if(!prop.maxDate || !prop.minDate) return true

    if(direction == "next") {
        if(compareDates(date, prop.maxDate) == "same") return true
        if(compareDates(date, prop.maxDate) == "after") return false
    }

    if(direction == "previous") {
        if(compareDates(date, prop.minDate) == "same") return true
        if(compareDates(date, prop.minDate) == "before") return false
    }

    return true
}

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

function checkMarking(date: Date) {
    if(prop.isRange) {
        if(compareDates(selectedDateRange.value[0], selectedDateRange.value[1]) == "same"){
            if(compareDates(date, selectedDateRange.value[0]) == "same") return { start: true, middle: false, end: false }
            return { start: false, middle: false, end: false}
        }

        if(compareDates(date, selectedDateRange.value[0]) == "same") {
            return { start: true, middle: false, end: false }
        }
        else if(compareDates(date, selectedDateRange.value[1]) == "same") {
            return { start: false, middle: false, end: true }
        }
        else if(compareDates(date, selectedDateRange.value[0]) == "after" && compareDates(date, selectedDateRange.value[1]) == "before") {
            return { start: false, middle: true, end: false }
        }

        return { start: false, middle: false, end: false }
    }

    if(compareDates(date, selectedDate.value) == "same") {
        return { start: true, middle: false, end: false }
    }

    return { start: false, middle: false, end: false }
}

function dragHold(date: Date, inThisMonth: boolean) {
    if(!inThisMonth) {
        const thisMonth = new Date(currentYear.value, currentMonth.value)

        if(compareDates(date, thisMonth) == "before") {
            changeMonth("previous")
        }
        else if(compareDates(date, thisMonth) == "after") {
            changeMonth("next")
        }

        return
    }

    if(!prop.isRange) return emit("update:modelValue", date)

    oldRangeDate.value = date

    chooseSideToMove(date)
    moveRangeDate(date)
}

function dragDrop(date: Date, inThisMonth: boolean) {
    if(!inThisMonth) return

    if(movingRange.value.start && movingRange.value.end) {
        movingRange.value.start = false
        movingRange.value.end = false
        return
    }

    if(movingRange.value.start) {
        emit("update:modelValue", [date, selectedDateRange.value[1]])
        movingRange.value.start = false
        return
    }
    if(movingRange.value.end) {
        emit("update:modelValue", [selectedDateRange.value[0], date])
        movingRange.value.end = false
        return
    }
}

function chooseSideToMove(date: Date) {
    if(compareDates(selectedDateRange.value[0], date) == "same") {
        movingRange.value.start = true
        movingRange.value.end = false
    }
    else if(compareDates(selectedDateRange.value[1], date) == "same") {
        movingRange.value.start = false
        movingRange.value.end = true
    }
    else if(compareDates(selectedDateRange.value[0], date) == "before" && compareDates(selectedDateRange.value[1], date) == "after") {
        movingRange.value.start = true
        movingRange.value.end = true
    }
    else if(compareDates(selectedDateRange.value[0], date) == "before") {
        emit("update:modelValue", [selectedDateRange.value[0], date])
    }
    else if(compareDates(selectedDateRange.value[1], date) == "after") {
        emit("update:modelValue", [date, selectedDateRange.value[1]])
    }
}

function moveRangeDate(date: Date) {
    if(movingRange.value.start && movingRange.value.end) {
        const dateTimeStamp = date.getTime()
        const startDateTimeStamp = selectedDateRange.value[0].getTime()
        const endDateTimeStamp = selectedDateRange.value[1].getTime()

        if(dateTimeStamp - startDateTimeStamp < endDateTimeStamp - dateTimeStamp) {
            emit("update:modelValue", [date, selectedDateRange.value[1]])
        } else {
            emit("update:modelValue", [selectedDateRange.value[0], date])
        }

        return
    }
    
    if(movingRange.value.start) {
        if(compareDates(date, selectedDateRange.value[1]) == "after") {
            emit("update:modelValue", [selectedDateRange.value[1], date])

            movingRange.value.start = false
            movingRange.value.end = true
            return
        }

        emit("update:modelValue", [date, selectedDateRange.value[1]])
        return
    } else if(movingRange.value.end) {
        if(compareDates(date, selectedDateRange.value[0]) == "before") {
            emit("update:modelValue", [date, selectedDateRange.value[0]])

            movingRange.value.start = true
            movingRange.value.end = false
            return
        }

        emit("update:modelValue", [selectedDateRange.value[0], date])
        return
    }
}

const calendarElement = ref(null)
const { isOutside } = useMouseInElement(calendarElement)

watch(isOutside, (value) => {
    if(value) {
        if(movingRange.value.start) emit("update:modelValue", [oldRangeDate.value, selectedDateRange.value[1]])
        if(movingRange.value.end) emit("update:modelValue", [selectedDateRange.value[0], oldRangeDate.value])
        movingRange.value = {
            start: false,
            end: false
        }
    }
})

let justClosed = false

function outsideClickEvent() {
    isYearChangerOpen.value = false
    justClosed = true
    setTimeout(() => {
        justClosed = false
    }, 100)
}

function yearMonthClickEvent() {
    if(justClosed) return
    isYearChangerOpen.value = !isYearChangerOpen.value
}

const isYearChangerOpen = ref(false)
</script>

<template>
<SystemFlex class="datePicker" ref="calendarElement"
    background="dark"
    width="17rem"
    padding="normal"

    radius="small"
    shadow="on"

    direction="column"
    gap="small"
>
    <SystemFlex
        align-items="center"
        justify-content="space-between"
        width="100%"
    >
        
        <SystemFlex class="monthChanger"
            gap="normal"
        >
            <SystemIcon @click="changeMonth('previous')" src="/icons/expand.svg" ratio="height" size="tiny" style="transform: rotate(90deg)" />
            <SystemIcon @click="changeMonth('next')" src="/icons/expand.svg" ratio="height" size="tiny" style="transform: rotate(-90deg)" />
        </SystemFlex>
        <p class="monthYearDisplay" @click="yearMonthClickEvent">{{ useDateFormat(new Date(currentYear, currentMonth), "MMMM YYYY", { locales: 'en-US' }).value }}</p>
    </SystemFlex>
    <DatePickerCalendarColumns 
        :is-range="isRange" 
        :day-list="monthDayList" 
        @drag-hold="dragHold"
        @drag-drop="dragDrop"
        @mouse-over-day="moveRangeDate" 
         
    />

    <Transition name="fade">
        <OnClickOutside @trigger="outsideClickEvent" v-if="isYearChangerOpen" class="DateYearChanger">
            <DatePickerYearChanger
                :current-year="currentYear" 
                :max-date="maxDate" 
                :min-date="minDate"
                
                @change-year="(year, monthIndex) => {currentYear = year, currentMonth = monthIndex, isYearChangerOpen = false}"
            />
        </OnClickOutside>
    </Transition>
</SystemFlex>
</template>

<style scoped lang="scss">
.datePicker {
    --_connector-color: rgb(106, 101, 101, 0.4);
    --_dayLabel_connector-color: rgb(106, 101, 101, 0.2);
    
    position: relative;

    .DateYearChanger {
        position: absolute;
        top: 3rem;
        right: 1rem;
    }

    .monthChanger {
        user-select: none;

        img {
            cursor: pointer;
        }
    }

    .monthYearDisplay {
        transition: all 50ms ease-in;
        cursor: pointer;
        border-radius: 2rem;

        user-select: none;

        &:hover {
            filter: drop-shadow(0px 0px 0.5rem var(--grey));
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 100ms;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>