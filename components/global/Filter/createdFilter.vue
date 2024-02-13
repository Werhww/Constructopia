<script setup lang="ts">
const props = defineProps<{
    item: string, 
    operator: string, 
    value: string | number | Date[]
    index: number
}>()

const name = computed(() => {
    if(props.item === "createdAt") {
        return "Created"
    }

    return props.item.charAt(0).toUpperCase() + props.item.slice(1)
})

const sign = computed(() => {
    const sign = shortHandMathSigns.find(sign => sign.value === props.operator)
    return sign?.utf
})

const shownValue = computed(() => {
    if(props.value instanceof Array) {
        if(props.value.length == 2) {
            return `${useDateFormat(props.value[0], "MMM. Do YYYY").value} ≡ ${useDateFormat(props.value[1], "MMM. Do YYYY").value}`
        }

        return useDateFormat(props.value[0], "MMM. Do YYYY").value
    }

    return props.value
})

const shortHandMathSigns = [
    {
        value: "lt",
        utf: "<"
    },
    {
        value: "lte",
        utf: "≤"
    },
    {
        value: "gt",
        utf: ">"
    },
    {
        value: "gte",
        utf: "≥"
    },
    {
        value: "eq",
        utf: "="
    },
    {
        value: "ex",
        utf: "≠"
    },
    {
        value: "bt",
        utf: "-"
    }

]

</script>

<template>
<SystemFlex class="createdFilter"
    align-items="center"
    justify-content="center"
    gap="tiny"
    radius="small"

    background="dark"
    shadow="on"
>
    <label>{{ name }} {{ sign }} {{ shownValue }}</label>
    <SystemIcon src="/icons/close.svg" size="tiny" />
</SystemFlex>
</template>

<style scoped lang="scss">
.createdFilter {
    transition: all 0.2s ease-in-out;
    padding: 0.25rem;

    &:hover {
        background-color: var(--grey);
    }


    img {
        margin-top: 0.1rem;

        &:hover {
            cursor: pointer;
        }
    }
}
</style>