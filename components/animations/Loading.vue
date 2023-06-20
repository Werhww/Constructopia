<template>
<LottieAnimation
    class="wrapper"
    :animationData="animation"
    :loop="true"
    :autoPlay="true"
    :speed="1.5"
/>
</template>

<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import animation from '~/assets/animations/loading-ani.json';
</script>


<style scoped>
.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>