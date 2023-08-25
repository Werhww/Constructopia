<template>
    <TheHeader />

    <slot />

    <TheFooter />
</template>

<script setup lang="ts">
</script>

<style scoped>
.test {
    color: var(--white);
    font: var(--title);
}
</style>