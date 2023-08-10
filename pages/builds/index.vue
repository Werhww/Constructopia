<template>
  <BuildListNormal 
    title="Popular"
    :builds="testList"  
  />

  <BuildListProfile
    title="My Builds"
    :builds="testList"
  />
</template>


<script setup lang="ts">
const route = useRoute()
definePageMeta({
  title: 'Home',
})

useHead({
  meta: [{ property: 'og:title', content: `Constructopia - ${route.meta.title}` }]
})

const testList = ref<any>([])

onMounted(async () => {
  const list = await getBuildListByCategory('test')
  testList.value = list
})
</script>

<style scoped>

</style>