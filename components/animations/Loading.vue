<template>
<LottieAnimation
    :class="{'wrapper': fullScreen}"
    :animationData="animation"
    :loop="true"
    :autoPlay="true"
    :speed="1.5"
/>
</template>

<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import animation from '~/assets/animations/loading-ani.json';

defineProps<{
    fullScreen: boolean    
}>()
</script>


<style scoped>
.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 11;
}
</style>