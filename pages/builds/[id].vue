<template>
<BuildListProfile title="Test"/>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Builds'
})

const { id } = useRoute().params
</script>

<style scoped>

</style>