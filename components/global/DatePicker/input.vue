<script setup lang="ts">
interface Props {
    isRange?: boolean
    width?: string
    height?: string
    maxDate?: Date
    minDate?: Date
}

const props = withDefaults(defineProps<Props>(), {
    isRange: false,
    width: "17rem",
    height: "2.25rem"
})
const datePickerDate = ref<Date | [Date, Date] | undefined>()

const datesInList = computed(() => {
    if(!datePickerDate.value) return []
    if (props.isRange)return datePickerDate.value as Date[] 
    else return [datePickerDate.value] as Date[]
})

const datePickerTopPlacement = computed(() => {
    const heightAsNumber = Number(props.height.replace('rem', ''))
    return `${heightAsNumber + .75}rem`
})

watch(datePickerDate, (newVal, oldVal) => {
    console.log(newVal)
    console.log(oldVal)
})

const datePickerOpen = ref(false)
</script>

<template>
<div class="datePickerInput">
    <div class="datePickerLabel" :date-range="isRange" @click="datePickerOpen = !datePickerOpen">
        <p>{{ useDateFormat(datesInList[0], "DD MMM YYYY", { locales: 'en-US' }).value }}</p>
        <img src="/icons/arrowRight.svg" alt="arrow right" v-if="isRange">
        <p v-if="isRange">{{ useDateFormat(datesInList[1], "DD MMM YYYY", { locales: 'en-US' }).value }}</p>
        <SystemIcon src="/icons/calendar.svg" ratio="height" size="medium"/>
    </div>

    <DatePicker class="datePicker" 
        v-model="datePickerDate" 
        v-if="datePickerOpen"

        :isRange="isRange"
        
        :maxDate="maxDate"
        :minDate="minDate"
    />
</div>
</template>

<style scoped lang="scss">
.datePickerInput {
    position: relative;
}

.datePickerLabel {
    cursor: pointer;

    position: relative;

    background-color: var(--dark);
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
            flex: 1;
            text-align: center;
        }

        img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 0.75rem;
        }
    }

    & > p {
        width: 7rem;
        user-select: none;
    }
}

.datePicker {
    position: absolute;
    top: v-bind(datePickerTopPlacement);
    left: 0;
}
</style>