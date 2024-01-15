<script setup lang="ts">
function test() {
    console.log("test")
}

const selectedValue = ref("test323")

const options = [
    {
        label: "test",
        value: "test323"
    },
    {
        label: "test2",
        value: "test2"
    },
    {
        label: "test3",
        value: "test3"
    },
    {
        label: "test32",
        value: "test32"
    }
]
</script>

<template>
<SystemButton :reverse-change="true" icon="/icons/like.svg" change-icon="/icons/likeFilled.svg" text="test"/>

<SystemSelect :options="options" v-model="selectedValue"/>
</template>

<style scoped lang="scss">

</style>