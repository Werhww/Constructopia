<template>
<div>

</div>
</template>

<script setup lang="ts">
const router = useRouter()

const navigationRoute = []

router.beforeEach((to, from, next) => {
    console.log(to.path)
    

    navigationRoute.push(to.path)
    next()
})
</script>

<style scoped>

</style>