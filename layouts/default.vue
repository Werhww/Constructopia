<template>
    <TheHeader />

    <slot />

    <TheFooter />
</template>

<script setup lang="ts">
onMounted(checkUIDCookie)
</script>

<style scoped>
.test {
    color: var(--white);
    font: var(--title);
}
</style>