<template>
<div>
    <p>Builds id {{ id }}</p>
</div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Builds'
})

const { id } = useRoute().params
</script>

<style scoped>

</style>