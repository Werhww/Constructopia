<template>
    <TheHeader :title="title"/>

    <slot />

    <TheFooter />
</template>

<script setup lang="ts">
const router = useRouter()
const title = ref('')

watch(() => router.currentRoute.value.meta.title, (value) => {
    console.log(value)
    title.value = value as string
})

onMounted(() => {
    title.value = router.currentRoute.value.meta.title as string
})
</script>

<style scoped>
.test {
    color: var(--white);
    font: var(--title);
}
</style>