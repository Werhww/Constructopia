<script setup lang="ts">
const props = defineProps<{
    item: string, 
    operator: string, 
    value: string | number | Date[]
}>()
</script>

<template>
<SystemFlex class=""
    align-items="center"
    gap="tiny"
>
    <label>{{ item }}</label>
    <SystemIcon src="/icons/close.svg" size="tiny" />
</SystemFlex>
</template>

<style scoped lang="scss">

</style>