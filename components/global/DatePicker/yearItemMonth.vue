<script setup lang="ts">
const props = defineProps<{
    year: number
    monthIndex: number
    show: boolean    
}>()
const monthPrefix = ref(useDateFormat(new Date(props.year, props.monthIndex, 1), "MMM" , { locales: 'en-US' }))
defineEmits({
    changeMonth: (month: number) => true
})
</script>

<template>
<SystemFlex class="yearItemMonth" 
    tag="span"
    justify-content="center"
    align-items="center"
    @click="$emit('changeMonth', props.monthIndex)"
    :class="{
        outOfRange: !props.show
    }"
>
    {{ monthPrefix }}
</SystemFlex>
</template>

<style scoped lang="scss">
.yearItemMonth {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    background-color: var(--_dayLabel_connector-color);
    border-radius: var(--rad-small);

    --_box-size: 1.8rem;

    width: var(--_box-size);
    height: var(--_box-size);

    &:hover {
        background-color: var(--_connector-color);
    }
}

.outOfRange {
    pointer-events: none;
    color: var(--_dayLabel_connector-color);
}
</style>