<script setup lang="ts" >
const datePickerValue = ref()

watch(datePickerValue, (newVal, oldVal) => {
    console.log('newVal', newVal)
})
</script>

<template>
    <div class="test">
        <!-- <Filter /> -->
        <DatePickerInput :isRange="false" :maxDate="new Date()" :minDate="new Date(2020, 2, 27)" />
    </div>
</template>

<style scoped lang="scss">
.test {
    padding: 10rem;
}
</style>