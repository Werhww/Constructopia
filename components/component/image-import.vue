<template>
<div class="image-import">
    <img src="/icons/components/import-image.svg" alt="">
    <div><!-- Background color with blur --></div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.image-import {
    width: 18.75rem;
    height: 18.75rem;
    position: relative;
    overflow: hidden;

    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
}

.image-import > div{
    width: 100%;
    height: 100%;

    position: absolute;

    background-color: var(--inventory-item-background);
    filter: blur(50px);
}

.image-import > img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 10;
}
</style>