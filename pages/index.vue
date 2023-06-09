<template>
  <BuildListNormal title="Popular"/>
  
  <BuildListNormal title="Newest"/>
  
  <BuildListNormal title="Dark forrest"/>
</template>


<script setup lang="ts">
const route = useRoute()
definePageMeta({
  title: 'Constructopia'
})

useHead({
  meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
})
</script>

<style scoped>

</style>