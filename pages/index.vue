<script setup lang="ts" >
</script>

<template>
    <div class="test">
<!--         <Filter />
 -->
        <DatePicker :is-range="false" :min-date="new Date(2010, 0, 1)" :max-date="new Date(2030, 0, 1)" />
    </div>
</template>

<style scoped lang="scss">
.test {
    padding: 10rem;
}
</style>