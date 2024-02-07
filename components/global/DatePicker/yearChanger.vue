<script setup lang="ts">
interface Props {
    currentYear: number
    maxDate?: Date
    minDate?: Date
    rangeUp?: number
    rangeDown?: number
    yearStep?: number
}

const props = withDefaults(defineProps<Props>(), {
    rangeDown: 10,
    rangeUp: 10,
    yearStep: 1
})

defineEmits({
    changeYear: (year: number, monthIndex: number) => true
})

const yearWrapper = ref<HTMLElement | null>(null)
const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
const lowestYear = ref(props.minDate ? props.minDate.getFullYear() : props.currentYear - props.rangeDown)
const highestYear = ref(props.maxDate ? props.maxDate.getFullYear() : props.currentYear + props.rangeUp)

const yearList = computed(() => range(lowestYear.value, highestYear.value, props.yearStep))
const firstOpen = ref(false)
const alreadyOpen = ref(false)


useInfiniteScroll(
    yearWrapper,
    () => {
        if(props.maxDate) return

        highestYear.value += props.rangeUp
    },
    { 
        distance: 20,
    }
)

useInfiniteScroll(
    yearWrapper,
    () => {
        if(props.minDate) return

        if(!firstOpen.value) {
            firstOpen.value = true
            yearWrapper.value?.scrollTo({
                top: 60,
                behavior: "smooth"
            })
            return
        }

        for(let i = 0; i < props.rangeUp; i++) {
            lowestYear.value--
        }

        yearWrapper.value?.scrollTo({
            top: 30,
            behavior: "smooth"
        })
    },
    { 
        distance: 5,
        direction: "top"
    }
)

function moveTo(offsetTop: number) {
    yearWrapper.value?.scrollTo({
        top: offsetTop,
        behavior: "smooth"
    })
}

function onLoadSnap(offsetTop: number) {
    yearWrapper.value?.scrollTo({
        top: offsetTop,
        behavior: "instant"
    })
    alreadyOpen.value = true
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
                :alreadyOpen="alreadyOpen"

                :maxDate="maxDate"
                :minDate="minDate"

                @yearOpen="moveTo"
                @onLoadSnap="onLoadSnap"
                @changeYear="(year, monthIndex) => $emit('changeYear', year, monthIndex)"
            />
        </div>
    </SystemFlex>
</template>

<style scoped lang="scss">
.yearChanger {
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