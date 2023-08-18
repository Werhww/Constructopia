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
  testList.value = await getBuildListByCategory('1234test')
})
</script>

<style scoped>

</style>