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

const yearList = computed(() => {

    const years = [...range(lowestYear.value, highestYear.value, 1)]

    return years
})


useInfiniteScroll(
    yearWrapper,
    () => {
        if(props.maxDate) {
            const highestYearDate = new Date(highestYear.value, 0, 0)
            if(highestYearDate.getTime() >= props.maxDate.getTime()) return
        }

        highestYear.value++
    },
    { 
        distance: 20,
    }
)

useInfiniteScroll(
    yearWrapper,
    () => {
        if(props.minDate) {
            const lowestYearDate = new Date(lowestYear.value, 0, 0)
            if(lowestYearDate.getTime() <= props.minDate.getTime()) return
        }

        lowestYear.value--
    },
    { 
        distance: 20,
        direction: "top"
    }
)

onMounted(() => {
    if(props.maxDate) {
        const highestYearDate = new Date(highestYear.value, 0, 0)
        if(highestYearDate.getTime() >= props.maxDate.getTime()) {
            highestYear.value = props.maxDate.getFullYear()
        }
    }

    if(props.minDate) {
        const lowestYearDate = new Date(lowestYear.value, 0, 0)
        if(lowestYearDate.getTime() <= props.minDate.getTime()) {
            lowestYear.value = props.minDate.getFullYear()
        }
    }

    const markedElement = yearWrapper.value?.querySelector("[data-current-year='true']") as HTMLElement

    yearWrapper.value?.scrollTo({
        top: markedElement.offsetTop,
        behavior: "smooth"
    })
})
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
            <SystemFlex v-for="year in yearList"
                direction="column"
                width="100%"
                :data-current-year="year == props.currentYear"
            >
                {{ year }}
    
            </SystemFlex>
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

        div {
            padding: var(--pad-small) 0;
            cursor: pointer;
            transition: all 0.2s ease-in-out;

            &[data-current-year="true"] {
                color: var(--primary);
                font-weight: 600;
            }

            &:hover {
                color: var(--primary);
                font-weight: 600;
            }
        }

    }
}
</style>