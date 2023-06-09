<template>
    <TheHeader :title="title" ref="HeaderRef" v-on:open="updateDropdownState"/>

    <slot />

    <TheFooter />
</template>

<script setup lang="ts">
const router = useRouter()
const HeaderRef = ref()
const title = ref('')

const HeaderDropdownState = ref(false)

function updateDropdownState(value: boolean) {
    HeaderDropdownState.value = value
}

watch(() => router.currentRoute.value.meta.title, (value) => {
    title.value = value as string
    if (HeaderDropdownState.value) {
        HeaderRef.value.open()
    }
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