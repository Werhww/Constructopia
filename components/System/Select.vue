<script setup lang="ts">
interface Options {
    value: string
    label: string
}

const prop = withDefaults(defineProps<{
    options: Options[]
    modelValue: string

    shadow?: "on" | "off"
}>(), {
    shadow: "on"
})

const emit = defineEmits(["update:modelValue"])
defineExpose({ closeSelect })


const selectedValue = computed(() => {
    return prop.options.find((option) => option.value == prop.modelValue)!
})

const optionsOpen = ref(false)

const optionsHeight = computed(() => {
    const fullHeight = (prop.options.length * 1.875) - 0.625
    return fullHeight > 5 ? "5rem" : `${fullHeight}rem`
})

function selectOption(option: Options) {
    closeSelect()
    emit("update:modelValue", option.value)
}

function closeSelect() {
    optionsOpen.value = false
}
</script>

<template>
<SystemFlex class="select">
    <SystemFlex class="selectButton"
        justify-content="space-between"
        align-items="center"
        width="10rem"
        height="fit-content"
        radius="small"
        padding="small"
        background="dark"
        :shadow="shadow"

        @click="optionsOpen = !optionsOpen"
    >
        <p>{{ selectedValue.label }}</p>
        <img class="expandArrow" :data-rotate="optionsOpen"  src="/icons/expand.svg">
    </SystemFlex>
    <Transition name="slideIn">
        <SystemFlex v-if="optionsOpen" class="selectOptions"
            width="10rem"
            padding="small"
            shadow="on"
            :height="optionsHeight"

            background="dark"
        >
            <SystemFlex
                direction="column"
                gap="none"
                width="100%"
            >
                <SystemFlex v-for="item in options" @click="selectOption(item)">
                    <p>{{ item.label }}</p>
                </SystemFlex>
            
            </SystemFlex>

        </SystemFlex>
    </Transition>
</SystemFlex>
</template>

<style scoped lang="scss">
.select {
    user-select: none;
    position: relative;
}

.expandArrow {
    transition: all 300ms ease;
    transform: rotate(-180deg);

    &[data-rotate="true"] {
        transform: rotate(0deg)
    }
}

.selectButton {
    z-index: 10;
    cursor: pointer;
}

.selectOptions {
    z-index: 5;

    padding-top: .25rem;

    position: absolute;
    top: 2rem;
    border-radius: 0 0 var(--rad-small) var(--rad-small);

    & > div {
        overflow-y: scroll;
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

        div {
            cursor: pointer;
        }
    }
}

.slideIn-enter-active,
.slideIn-leave-active {
  transition: all 300ms ease;
}

.slideIn-enter-from,
.slideIn-leave-to {
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

</style>