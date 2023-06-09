<script setup lang="ts">
const emit = defineEmits(['change', 'change-direction'])

const props = defineProps<{
    label: string
    items: {
        label: string
        index: number
    }[]
    withDirection: boolean
}>()

const items = ref<{
    label: string
    index: number
}[]>()

const openItem = ref<{
    label: string
}>({
    label: "",
})

const isOpen = ref(false)

function changeItem(i:number) {
    if (isOpen.value) {
        emit('change', openItem.value.label)
    }
    fixList(i)
    toggle()
}

function toggle() {
    isOpen.value = !isOpen.value
}

function fixList(i:number) {
    openItem.value = props.items[i]
    items.value = props.items.filter((item, index) => index != i)
}

fixList(0)

const direction = ref(true)
const directionSpeed = ref(0.5)

function changeDirection() {
    direction.value = !direction.value
    emit('change-direction', direction.value? "desc" : "asc")
}
</script>

<template>
<div class="filter">
    <p class="filter-title">{{ label }}</p>
    <img v-if="withDirection" :class="{'dir-ani': direction, 'direction': true}" @click="changeDirection" src="/icons/components/arrow-up-circle.svg">
    <div @click="toggle" class="hover">
        <p>{{ openItem.label }}</p>
    </div>
    <img @click="toggle" src="../../assets/dropdown-arrow.svg" class="arrow hover" :class="{'arrow-ani': isOpen}">
    <Transition name="slide">
        <div v-if="isOpen" class="dropdown">
            <p class="hover" v-for="item in items" @click="changeItem(item.index)">
                {{ item.label }}
            </p>
        </div>
    </Transition>
</div>
</template>

<style scoped>
.filter {
    position: relative;
    display: flex;
    gap: 0.625rem;
    user-select: none;

    z-index: 1;
}

.dropdown p {
    font: var(--undertitle);
    color: var(--white);
    user-select: none;
}

.filter-title {
    color: var(--lower-tone);
}

.hover {
    cursor: pointer;
}

.arrow {
    transition: all .5s ease;
    
}

.arrow-ani {
    transform: rotate(180deg);
}

.dropdown {
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 1.4rem;
    left: 4.6rem;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: var(--background);
    padding: 0 1rem 0.3rem .3rem;
    border-radius: 0 0 0.625rem 0.625rem;
}

.dropdown > p{
    color: var(--lower-tone);
}

.slide-enter-active {
    transition: all 0.2s ease-in;
}

.slide-leave-active {
  transition: all 0.5s ease-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-20px);
    opacity: 0;
}

.direction{
    transition: transform v-bind(directionSpeed + "s") ease;
    cursor: pointer;
}

.dir-ani {
    transform: rotate(180deg);
}
</style>