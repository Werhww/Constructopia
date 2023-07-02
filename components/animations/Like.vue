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

const emit = defineEmits<{
    (e: 'like', value: boolean): void
}>()

defineExpose({
    play: play
})

let isEnd = ref(prop.liked);
let anim = ref();

onMounted(() => {
    if (prop.liked) {
        anim.value.goToAndStop(30, true);
    }
})

watch(()=> prop.liked ,(newVal)=> {
    if (newVal) {
        anim.value.goToAndStop(30, true);
    }
})

function play() {
    isEnd.value? anim.value.setDirection(-1) : anim.value.setDirection(1);
    isEnd.value = !isEnd.value;
    anim.value.play()
    emit('like', isEnd.value)
}
</script>


<style scoped>
.wrapper {
    width: 2rem;
    height: 2rem;
}
</style>