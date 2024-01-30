<script setup lang="ts">
interface Props {
    modelValue?: string
    placeholder?: string
    width?: string
    height?: string
    type?: string
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: "",
    width: "10rem",
    height: "2.25rem",
    type: "text"
})

function numberCheck(e: KeyboardEvent) {
    if(props.type != "number") return

    let char = e.key
    
    const normals = ["Backspace", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab", "Delete", "Home", "End", "Enter", "Escape", "Control", "Alt", "Shift", "Meta"]

    if (normals.includes(char)) return true
    if (/^[0-9+()-.]*$/.test(char)) return true
    
    e.preventDefault()
    return false
}
</script>

<template>
<SystemFlex class="systemInput"
    background="background"
    :width="width"
    :height="height"
    radius="small"
>
    <input :type="type" :placeholder="placeholder" @keydown="numberCheck">
</SystemFlex>
</template>

<style scoped lang="scss">
.systemInput {
    
    & > input {
        width: 100%;
        height: 100%;
        border: none;
        background: transparent;
        outline: none;
        color: white;
        font-size: 1rem;
        font-weight: 500;
        padding: 0.625rem 0.75rem;

        &::placeholder {
            color: var(--grey);
        }

        &[type="number"] {
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        }

        &[type="date"] {
            color-scheme: dark;
        }
    }

    
}
</style>