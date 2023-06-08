<template>
<BuildCard
  buildId="1"
  image="https://i.pinimg.com/736x/f5/c0/a2/f5c0a23a575e40913a2056441a30412b.jpg"
  title="The Best Build Ever"
  date="2021-08-01"
  user="12"
  difficulty="Easy"
  blocks="15"
  views="100"
  :liked="true"
/>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Favorites'
})
</script>

<style scoped>

</style>