<template>
<div class="dropdown">
    <p @click="isOpen = !isOpen">/{{ difficulty }}</p>
    <img :class="{'arrow': arrowFilter}" @click="isOpen = !isOpen" src="/icons/global/dropdown-arrow.svg">
    <div class="dropdown-content" v-if="isOpen">
        <p v-for="text in dropdown_content" @click="changeDifficulty(text)">{{ text }}</p>
    </div>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    modelValue: string
    white?: boolean
    disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const difficulty = ref(prop.modelValue)
const dropdown_content = ref<string[]>([])

const isOpen = ref(false)

function changeDifficulty(click_difficulty: string) {
    if (prop.disabled) return /* if disabled, do nothing */

    const new_dropdown_content = ALL_DIFFICULTIES.filter((item) => item !== click_difficulty) /* filtes out clicked difficulty item */
    difficulty.value = click_difficulty /* change current showed difficulty */
    emit('update:modelValue', click_difficulty) /* emit event to parent */
    dropdown_content.value = new_dropdown_content /* change dropdown content */
}

changeDifficulty(prop.modelValue) /* set initial difficulty */

const color = ref('var(--lower-tone)')
const arrowFilter = ref(true)
if (prop.white) {
    color.value = 'var(--white)'
    arrowFilter.value = false
}
</script>


<style scoped>
.dropdown {
    display: flex;
    position: relative;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font: var(--undertitle);
    color: v-bind(color);
}

.arrow {
    filter: invert(40%) sepia(6%) saturate(246%) hue-rotate(314deg) brightness(90%) contrast(95%);
}

.dropdown-content {
    z-index: 10;
    
    position: absolute;
    top: 1.5rem;

    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    
    background-color: var(--background);
    padding: 0 .3rem .3rem .3rem;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
}
</style>