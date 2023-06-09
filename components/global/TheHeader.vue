<template>
<header>
    <h1 class="title">{{ title }}</h1>
    <nav class="buttons">
        <HSearch />
        <HDropdown ref="dropdown" v-on:open="emit_open"/>
    </nav>
</header>
</template>

<script setup lang="ts">
const prop = defineProps<{
    title: string
}>()

defineExpose({
    open
})

const emit = defineEmits(['open'])

const dropdown = ref()

function emit_open(value: boolean) {
    emit('open', value)
}

function open() {
    dropdown.value.open()
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: var(--white-2);
}

.title {
    font: var(--title);
}

.buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>