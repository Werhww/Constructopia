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
definePageMeta({
  title: 'Home',
})

const route = useRoute()

useHead({
  meta: [{ property: 'og:title', content: `Constructopia - ${route.meta.title}` }]
})

const testList = ref<any>([])

onMounted(async () => {
  const list = await getBuildListByCategory('1234test')
  testList.value = list
})
</script>

<style scoped>

</style>