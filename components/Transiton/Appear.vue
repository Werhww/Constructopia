<script setup lang="ts">
interface Props {
    duration?: string
}

withDefaults(defineProps<Props>(), {
    duration: "300ms"
})
</script>

<template>
<Transition>
    <slot />
</Transition>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity v-bind(duration) ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>