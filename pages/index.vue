<script setup lang="ts">
function test() {
    console.log('test')

}
</script>

<template>
<div class="wrapper">
    <IconButton :click="test" icon="/icons/like.svg" changeIcon="/icons/likeFilled.svg" hoverText="eple" :reverseChange="false" :disabled="true"/>
</div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 3rem;
    display: flex;
}
</style>