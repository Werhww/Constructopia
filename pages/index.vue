<script setup lang="ts" >
const datePickerValue = ref()

watch(datePickerValue, (newVal, oldVal) => {
    console.log('newVal', newVal)
})
</script>

<template>
    <div class="test">
        <BuildCard
            :id="1"  
        />
    </div>
</template>

<style scoped lang="scss">
.test {
    padding: 10rem;
}
</style>