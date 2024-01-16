<script setup lang="ts">
interface Options {
    value: string
    label: string
}

const prop = defineProps<{
    options: Options[]
    modelValue: string
}>()

const emit = defineEmits(["update:modelValue"])

const selectedValue = computed(() => {
    return prop.options.find((option) => option.value == prop.modelValue)!
})

const optionsOpen = ref(false)

const optionsHeight = computed(() => {
    const fullHeight = (prop.options.length * 1.875) - 0.625
    return fullHeight > 5 ? "5rem" : `${fullHeight}rem`
})

function selectOption(option: Options) {
    optionsOpen.value = false
    emit("update:modelValue", option.value)
}
</script>

<template>
<SystemFlex
    direction="column"

    width="10rem"
    height="fit-content"

    padding="small"
    radius="small"
    shadow="on"
    background="dark"
>
    <SystemFlex 
        justify-content="space-between"
        align-items="center"
        @click="optionsOpen = !optionsOpen"
    >
        <p>{{ selectedValue.label }}</p>
        <img class="expandArrow" :data-rotate="optionsOpen"  src="/icons/expand.svg">
    </SystemFlex>
    <Transition name="slideIn">
        <SystemFlex v-if="optionsOpen" class="selectOptions"
            direction="column"
            gap="none"
            width="100%"
            :height="optionsHeight"
        >
            <SystemFlex v-for="item in options" @click="selectOption(item)">
                <p>{{ item.label }}</p>
            </SystemFlex>
        </SystemFlex>
    </Transition>
</SystemFlex>
</template>

<style scoped lang="scss">
.expandArrow {
    transition: all 300ms ease;
    transform: rotate(-180deg);

    &[data-rotate="true"] {
        transform: rotate(0deg)
    }
}

.selectOptions {
    overflow-y: scroll;
    margin-top: 1rem;
    gap: 0.625rem;

    &::-webkit-scrollbar {
        width: 0.2rem;
    }

    &::-webkit-scrollbar-track {
        background: var(--dark);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--grey);
        border-radius: var(--rad-small);
    }

}

.slideIn-enter-active,
.slideIn-leave-active {
  transition: all 300ms ease;
}

.slideIn-enter-from,
.slideIn-leave-to {
  height: 0;
  margin-top: 0;
}

</style>