<script setup lang="ts" >
const datePickerValue = ref()

watch(datePickerValue, (newVal, oldVal) => {
    console.log('newVal', newVal)
})
</script>

<template>
    <div class="test">
        <Suspense>
            <BuildCard
                :id="1"  
            />

            <template #fallback>
                <div>Loading...</div>   
            </template>
        </Suspense>

    </div>
</template>

<style scoped lang="scss">
.test {
    padding: 10rem;
}
</style>