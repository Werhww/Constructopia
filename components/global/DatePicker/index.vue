<script setup lang="ts">
interface Props {
    isRange?: boolean
}

const prop = withDefaults(defineProps<Props>(), {
    isRange: false
})

const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(new Date().getMonth() + 1)

const selectedDate = ref(new Date())
const selectedDateRange = ref([new Date(), new Date()])

const monthDayList = computed(() => {
    const year = currentYear.value
    const month = currentMonth.value 

    const dateMonth = new Date(year, month, 0)
    const daysInMonth = dateMonth.getDate()
    const lastDay = dateMonth.getDay();

    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInLastMonth = new Date(year, month - 1, 0).getDate()

    const days = []

    console.table({ year, month, daysInMonth, lastDay, firstDay, daysInLastMonth })

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month - 1, i)
        console.log(date, selectedDate.value)
        if(date === selectedDate.value) {
            days.push({ day: i, date: date, isThisMonth: true, start: true, middle: false, end: false })
            console.log("start")
            continue
        }

        days.push({ day: i, date: date, isThisMonth: true })
    }

    if(firstDay !== 1) { // 1 = monday so no need to add
        if(firstDay == 0) {
            for(let i = 0; i < 6; i++) {
                days.unshift({ day: daysInLastMonth - i, date: new Date(year, month - 1, daysInLastMonth - i), isThisMonth: false, start: false, middle: false, end: false})
            } 
        } else {
            for(let i = 1; i < firstDay; i++) {
                days.unshift({ day: daysInLastMonth - i, date: new Date(year, month - 1, daysInLastMonth - i), isThisMonth: false, start: false, middle: false, end: false })
            }  
        }
        
    }

    if (lastDay !== 0) { // 0 = sunday so no need to add
      for (let i = 1; i <= 7 - lastDay; i++) {
        days.push({ day: i, date: new Date(year, month + 1, i), isThisMonth: false, start: false, middle: false, end: false  });
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


function clickDay(date: Date) {
    console.log(date)
}
</script>

<template>
<SystemFlex
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
        
        <SystemFlex
            gap="normal"
        >
            <SystemIcon @click="changeMonth('previous')" src="/icons/expand.svg" ratio="height" size="tiny" style="transform: rotate(90deg)" />
            <SystemIcon @click="changeMonth('next')" src="/icons/expand.svg" ratio="height" size="tiny" style="transform: rotate(-90deg)" />
        </SystemFlex>
        <p>{{ useDateFormat(new Date(currentYear, currentMonth - 1), "MMMM YYYY").value }}</p>
    </SystemFlex>
    <div class="calendarColumns" :data-is-range="isRange">
        <p class="dayLabel">{{ useDateFormat(getDaysDate("monday"),"dd" ).value }}</p>
        <p class="dayLabel">{{ useDateFormat(getDaysDate("tuesday"),"dd" ).value }}</p>
        <p class="dayLabel">{{ useDateFormat(getDaysDate("wednesday"),"dd" ).value }}</p>
        <p class="dayLabel">{{ useDateFormat(getDaysDate("thursday"),"dd" ).value }}</p>
        <p class="dayLabel">{{ useDateFormat(getDaysDate("friday"),"dd" ).value }}</p>
        <p class="dayLabel">{{ useDateFormat(getDaysDate("saturday"),"dd" ).value }}</p>
        <p class="dayLabel">{{ useDateFormat(getDaysDate("sunday"),"dd" ).value }}</p>
        <div v-for="item in monthDayList" :class="{ day: item.isThisMonth }" @click="clickDay(item.date)" :data-start="item.start">
            <p :class="{ dayLabel: !item.isThisMonth }" >{{ item.day }}</p>
        </div>    
    </div>
</SystemFlex>
</template>

<style scoped lang="scss">
.calendarColumns {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    row-gap: 0.2rem;
    width: 100%;
    height: 100%;
    
    p {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.125rem;
        font-weight: 700;
    }

    .dayLabel {
        color: var(--grey);
        font-weight: 700;
    }

    .day {
        --_connector-color: rgb(106, 101, 101, 0.4);

        & > p {
            border-radius: 1rem;
            cursor: pointer;
        }

        transition: all 05ms ease-in-out;

        & > p {
            &:hover {
                background: var(--_connector-color);
            }
        }

        &[data-start="true"] {
            & > p {
                background: var(--grey);
            }
        }
    }

    &[data-is-range="true"] {
        .day {
            &[data-start="true"] {
                background: linear-gradient(to right, transparent, var(--grey));

                & > p {
                    background: var(--grey);
                }
            }

            &[data-middle="true"] {
                background: var(--grey);
            }

            &[data-end="true"] {
                background: linear-gradient(to left, transparent, var(--grey));

                & > p {
                    background: var(--grey);
                }
            }
        }
    }
}
</style>