<template>
<div class="blur"><!-- Background blur --></div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.blur {
    position: absolute;
    top: 0;
    left: 0;

    backdrop-filter: blur(8px);
    height: 100vh;
    width: 100vw;
    z-index: 10;
}
</style>