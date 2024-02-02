<script setup lang="ts">
const props = defineProps<{
    currentYear: number
    year: number
}>()
</script>

<template>
<SystemFlex class="yearItem" 
    radius="small"
    overflow="hidden"
>
    <SystemFlex :class="{ currentYear: currentYear, label: true }"
        width="100%"
        padding="small"
    >
        <span>{{ year }}</span>
    </SystemFlex>

</SystemFlex>
</template>

<style scoped lang="scss">
.yearItem {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .label {
        &:hover {
            background-color: var(--_connector-color);
        }
    }   

    .currentYear {
        font-weight: 600;
    }
}
</style>