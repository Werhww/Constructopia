<template>
<div>
    <input class="input" type="text" :value="modelValue" @input="updateValue" />
    <div class="underline"><!-- Underline --></div>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    modelValue: string
    width?: number
}>()

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target?.value)
    if (prop.width) return
    updateWidth(event.target?.value)
}

const inputWidth = ref(5)

function updateWidth(text: string) {
    if (text.length <= 7) {
        inputWidth.value = 7
        return
    } else {
        inputWidth.value = text.length * 0.4 + 7
        return
    } 
}


if (prop.width) {
    inputWidth.value = prop.width
} else {
    updateWidth(prop.modelValue)    
}
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;

    transition: width 0.2s ease-in-out;

    width: v-bind(inputWidth + 'rem');
}

.input {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0 0.625rem;
    margin: 0;
    
    color: var(--white);
    font: var(--text);
}

.underline {
    width: 100%;
    height: 5px;
    background-color: var(--white);
    border-radius: 1rem;
}
</style>