<template>
<div>
    <p>Build id {{ id }}</p>
</div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Build'
})

const { id } = useRoute().params
</script>

<style scoped>

</style>