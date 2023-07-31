<template>
  <BuildListNormal 
    title="Popular"
    :builds="testList"  
  />
</template>


<script setup lang="ts">
const route = useRoute()
definePageMeta({
  title: 'Constructopia'
})

useHead({
  meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
})

const testList = ref<any>([])

onMounted(async () => {
  const list = await getBuildList('test')
  testList.value = list
})
</script>

<style scoped>

</style>