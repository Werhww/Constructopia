<script setup lang="ts">
const props = defineProps<{
    year: number
    monthIndex: number    
}>()

const monthPrefix = ref(useDateFormat(new Date(props.year, props.monthIndex - 1, 1), "MMM" , { locales: 'en-US' }))
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
>
    {{ monthPrefix }}
</SystemFlex>
</template>

<style scoped lang="scss">
.yearItemMonth {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    border: solid 2px var(--_connector-color);
    color: var(--_connector-color);
    border-radius: var(--rad-small);
    font-weight: 700;


    --_box-size: 1.8rem;

    width: var(--_box-size);
    height: var(--_box-size);

    &:hover {
        background-color: var(--_connector-color);
    }
}
</style>