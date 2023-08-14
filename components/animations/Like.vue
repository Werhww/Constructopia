<template>
<LottieAnimation
    @click="play"
    class="wrapper"
    ref="anim"
    :animationData="animation"
    :loop="false"
    :autoPlay="false"
    :speed="1.5"
/>
</template>

<script setup lang="ts">
import { LottieAnimation } from "lottie-web-vue"
import animation from '~/assets/animations/favorite-ani.json';

const prop = defineProps<{
    liked: boolean
}>()

const emit = defineEmits(['clicked'])

defineExpose({
    play: play
})

let state = ref(prop.liked)
let anim = ref();

onMounted(() => {
    if (prop.liked) {
        anim.value.goToAndStop(30, true);
    }

    setTimeout(() => {
        firstChange = true
    }, 1000);
})

let firstChange = false

watch(() => prop.liked, (newVal)=> {
    if (!firstChange && newVal) {
        anim.value.goToAndPlay(30, true);
        firstChange = true
        state.value = true
    }
})

function play() {
    if (state.value) {
        anim.value.setDirection(-1);
    } else {
        anim.value.setDirection(1);
    }

    state.value = !state.value
    anim.value.play()
    emit('clicked')
}
</script>


<style scoped>
.wrapper {
    width: 2rem;
    height: 2rem;
}
</style>