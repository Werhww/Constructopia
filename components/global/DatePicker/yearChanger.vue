<script setup lang="ts">
interface Props {
    currentYear: number
    maxDate?: Date
    minDate?: Date
    rangeUp?: number
    rangeDown?: number
}

const props = withDefaults(defineProps<Props>(), {
    rangeDown: 10,
    rangeUp: 10
})

const yearWrapper = ref<HTMLElement | null>(null)
const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const lowestYear = ref(props.currentYear - props.rangeDown)
const highestYear = ref(props.currentYear + props.rangeUp)

const yearList = ref(range(lowestYear.value, highestYear.value, 1))


useInfiniteScroll(
    yearWrapper,
    () => {
        const yearToBeAdded = maxDateFix()

        for(let i = 0; i < yearToBeAdded; i++) {
            highestYear.value++
            yearList.value.push(highestYear.value)
        }
    },
    { 
        distance: 20,
    }
)

// Infinite scroll upwars
useInfiniteScroll(
    yearWrapper,
    () => {
        const yearToBeAdded = minDateFix()

        for(let i = 0; i < yearToBeAdded; i++) {
            lowestYear.value--
            yearList.value.unshift(lowestYear.value)
        }

        if(yearToBeAdded != 0) {
            yearWrapper.value?.scrollTo({
                top: 60,
                behavior: "smooth"
            })
        }
    },
    { 
        distance: 5,
        direction: "top"
    }
)

onMounted(() => {
    console.log(props.minDate)

    minDateFix()
    maxDateFix()
})

function minDateFix() {
    if(props.minDate) {
        const lowestYearDate = new Date(lowestYear.value, 0, 0)
        if(lowestYearDate.getFullYear() == props.minDate.getFullYear()) return 0

        if(lowestYearDate.getFullYear() < props.minDate.getFullYear()) {
            lowestYear.value = props.minDate.getFullYear()
            yearList.value = range(lowestYear.value, highestYear.value, 1)
            return 0
        }

        if(lowestYearDate.getFullYear() > props.minDate.getFullYear()) {
            const difference = lowestYearDate.getFullYear() - props.minDate.getFullYear()
            console.log(lowestYearDate.getFullYear(), props.minDate.getFullYear())
            console.log(difference)
            if(difference < 10) return difference + 1
        }
    }

    return props.rangeDown
}

function maxDateFix() {
    if(props.maxDate) {
        const highestYearDate = new Date(lowestYear.value, 0, 0)
        if(highestYearDate.getFullYear() == props.maxDate.getFullYear()) return 0

        if(highestYearDate.getFullYear() > props.maxDate.getFullYear()) {
            highestYear.value = props.maxDate.getFullYear()
            yearList.value = range(lowestYear.value, highestYear.value, 1)
            return 0
        }

        if(highestYearDate.getFullYear() < props.maxDate.getFullYear()) {
            const difference = highestYearDate.getFullYear() - props.maxDate.getFullYear()
            console.log(highestYearDate.getFullYear(), props.maxDate.getFullYear())
            console.log(difference)
            if(difference < 10) return difference + 1
        }
    }

    return props.rangeUp
}


function moveToCenter(offsetTop: number) {
    yearWrapper.value?.scrollTo({
        top: 80,
        behavior: "smooth"
    })
}
</script>

<template>
    <SystemFlex class="yearChanger"
        direction="column"
        width="10rem"
        height="10rem"
        padding="small"
        radius="small"
        background="dark"
        shadow="on"
    >
        <div ref="yearWrapper" class="scrollElement">
            <DatePickerYearItem
                v-for="year in yearList"
                :year="year"
                :currentYear="currentYear"
            />
        </div>
    </SystemFlex>
</template>

<style scoped lang="scss">
.yearChanger {
    position: absolute;
    top: 3rem;
    right: 1rem;

    .scrollElement {    
        overflow-y: scroll;
        z-index: 25;

        &::-webkit-scrollbar {
            width: 0.4rem;
        }

        &::-webkit-scrollbar-track {
            background: var(--dark);
        }

        &::-webkit-scrollbar-thumb {
            background: var(--grey);
            border-radius: var(--rad-small);
        }
    }
}
</style>