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
const testList = ref<any>([])
definePageMeta({
  title: 'Home',
})

useHead({
  meta: [
    { property: 'og:title', content: `Constructopia - ${route.meta.title}` },
    { property: 'og:description', content: 'The best website for sharing your Minecraft builds!!' }
  ]
})

onMounted(async () => {
  testList.value = await getBuildListByCategory(TestUserId)
  console.log(testList.value)
})
</script>

<style scoped>

</style>