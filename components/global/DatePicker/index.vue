<script setup lang="ts">
interface Props {
    isRange?: boolean
    maxDate?: Date
    minDate?: Date
}

const prop = withDefaults(defineProps<Props>(), {
    isRange: false
})

const currentYear = ref(new Date().getFullYear()) 
const currentMonth = ref(new Date().getMonth() + 1)

const selectedDate = ref(new Date())

const movingRange = ref({ start: false, end: false })
const oldRangeDate = ref()
const selectedDateRange = ref([new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()])

const monthDayList = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value 

    const dateMonth = new Date(year, month, 0)
    const daysInMonth = dateMonth.getDate()
    const lastDay = dateMonth.getDay();

    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInLastMonth = new Date(year, month - 1, 0).getDate()

    const days = []

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month - 1, i)
        const marking = checkMarking(date)

        days.push({...marking, day: i, date, isThisMonth: true})
    }

    if(firstDay !== 1) { // 1 = monday so no need to add
        if(firstDay == 0) {
            for(let i = 0; i < 6; i++) {
                const date = new Date(year, month - 2, daysInLastMonth - i)
                const marking = checkMarking(date)
                days.unshift({ ...marking, day: daysInLastMonth - i, date, isThisMonth: false})
            } 
        } else {
            for(let i = 0; i < firstDay - 1; i++) {
                const date = new Date(year, month - 2, daysInLastMonth - i)
                const marking = checkMarking(date)
                days.unshift({ ...marking, day: daysInLastMonth - i, date, isThisMonth: false})
            }  
        }
        
    }

    if (lastDay !== 0) { // 0 = sunday so no need to add
      for (let i = 1; i <= 7 - lastDay; i++) {
        const date = new Date(year, month, i)
        const marking = checkMarking(date)
        days.push({ ...marking, day: i, date, isThisMonth: false})
      }
    }

    return days
})

function changeMonth(direction: "next" | "previous") {
    if(direction == "next") {
        if(currentMonth.value == 12) return currentYear.value++, currentMonth.value = 1
        return currentMonth.value++
    }

    if(direction == "previous") {
        if(currentMonth.value == 1) return currentYear.value--, currentMonth.value = 12
        return currentMonth.value--
    }
}

function compareDates(currentDate: Date, nextDate: Date) {
    currentDate.setHours(0,0,0,0)
    nextDate.setHours(0,0,0,0)

    const currentDateTimestamp = currentDate.getTime()
    const nextDateTimestamp = nextDate.getTime()

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

function clickDay(date: Date, inThisMonth: boolean) {
    if(!inThisMonth) {
        const thisMonth = new Date(currentYear.value, currentMonth.value - 1)

        if(compareDates(date, thisMonth) == "before") {
            changeMonth("previous")
        }
        else if(compareDates(date, thisMonth) == "after") {
            changeMonth("next")
        }

        return
    }

    if(!prop.isRange) return selectedDate.value = date
    oldRangeDate.value = date

    if(movingRange.value.start) {
        selectedDateRange.value[0] = date
        movingRange.value.start = false
        return
    }
    if(movingRange.value.end) {
        selectedDateRange.value[1] = date
        movingRange.value.end = false
        return
    }

    chooseSideToMove(date)
    moveRangeDate(date)
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
    else if(compareDates(selectedDateRange.value[0], date) == "after" && compareDates(selectedDateRange.value[1], date) == "before") {
        movingRange.value.start = false
        movingRange.value.end = false
    }
    else if(compareDates(selectedDateRange.value[0], date) == "before") {
        selectedDateRange.value[1] = date
    }
    else if(compareDates(selectedDateRange.value[1], date) == "after") {
        selectedDateRange.value[0] = date
    }
}

function moveRangeDate(date: Date) {
    if(movingRange.value.start) {
        if(compareDates(date, selectedDateRange.value[1]) == "after") {
            selectedDateRange.value[0] = selectedDateRange.value[1]
            selectedDateRange.value[1] = date
            movingRange.value.start = false
            movingRange.value.end = true
            return
        }

        selectedDateRange.value[0] = date
        return
    }
    if(movingRange.value.end) {
        if(compareDates(date, selectedDateRange.value[0]) == "before") {
            selectedDateRange.value[1] = selectedDateRange.value[0]
            selectedDateRange.value[0] = date
            movingRange.value.start = true
            movingRange.value.end = false
            return
        }

        selectedDateRange.value[1] = date
        return
    }
}

const calendarElement = ref(null)
const { isOutside } = useMouseInElement(calendarElement)

watch(isOutside, (value) => {
    if(value) {
        if(movingRange.value.start) selectedDateRange.value[0] = oldRangeDate.value
        if(movingRange.value.end) selectedDateRange.value[1] = oldRangeDate.value
        movingRange.value = {
            start: false,
            end: false
        }
    }
})

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
        <p class="monthYearDisplay" @click="isYearChangerOpen = !isYearChangerOpen">{{ useDateFormat(new Date(currentYear, currentMonth - 1), "MMMM YYYY", { locales: 'en-US' }).value }}</p>
    </SystemFlex>
    <DatePickerCalendarColumns :is-range="isRange" :day-list="monthDayList" @calendar-click="clickDay" @mouse-over-day="moveRangeDate" />

    <Transition name="fade">
        <DatePickerYearChanger v-show="isYearChangerOpen" 
            :current-year="currentYear" 
            :max-date="maxDate" 
            :min-date="minDate"
            
            @change-year="(year, monthIndex) => {currentYear = year, currentMonth = monthIndex, isYearChangerOpen = false}"
        />
    </Transition>
</SystemFlex>
</template>

<style scoped lang="scss">
.datePicker {
    --_connector-color: rgb(106, 101, 101, 0.4);
    --_dayLabel_connector-color: rgb(106, 101, 101, 0.2);
    
    position: relative;

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