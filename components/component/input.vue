<template>
<div>
    <input class="input" v-bind="$attrs" :placeholder="placeholder" type="text" :value="modelValue" @input="updateValue" :maxlength="maxlength" />
    <div class="underline"><!-- Underline --></div>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    modelValue: string
    placeholder?: string
    width?: string
    font_size?: string
    maxlength?: number
}>()

const emit = defineEmits(['update:modelValue'])

const haveConstantWidth = ref(false)

function updateValue(event: any) {
    emit('update:modelValue', event.target?.value)
    if (prop.width) return
    updateWidth(event.target?.value)
}

const inputWidth = ref(5)
const usedWidth = ref('5rem')
const usedFont_size = ref('1.125rem')

function updateWidth(text: string) {
    if (haveConstantWidth.value) return

    if (text.length <= 7) {
        inputWidth.value = 7
    } else {
        inputWidth.value = text.length * 0.4 + 7
    }

    usedWidth.value = `${inputWidth.value}rem`
}


if (prop.width) {
    haveConstantWidth.value = true
    usedWidth.value = prop.width
} else {
    updateWidth(prop.modelValue)    
}

if (prop.font_size) {
    usedFont_size.value = prop.font_size
}
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;

    transition: width 0.2s ease-in-out;

    width: v-bind(usedWidth);
}

.input {
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0 0.625rem;
    margin: 0;
    
    color: var(--white);
    font: var(--text);
    font-size: v-bind(usedFont_size);
}

.input::placeholder {
    color: var(--white);
    font-size: v-bind(usedFont_size);
}

.underline {
    width: 100%;
    height: 5px;
    background-color: var(--white);
    border-radius: 1rem;
}
</style>