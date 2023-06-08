<template>
    <h1>Home</h1>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi totam laborum dolore dolores iusto fugiat commodi ipsa consequatur aperiam tenetur.</p>
</template>

<script setup lang="ts">
const route = useRoute()
definePageMeta({
  title: 'MineSweeper'
})

useHead({
  meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
})
</script>

<style scoped>

</style>