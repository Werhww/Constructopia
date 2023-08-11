<script setup lang="ts">
const emit = defineEmits(['change', 'change-direction'])

const prop = defineProps<{
    label: string
    items: string[]
    withDirection: boolean
}>()

const currentItemList = ref(prop.items.filter((item) => item != prop.items[0]))
const currentItem = ref(prop.items[0])

const isOpen = ref(false)

function changeItem(newItem:string) {
    currentItemList.value = prop.items.filter((item) => item != newItem)
    currentItem.value = newItem
    emit('change', newItem)
    toggle()
}

function toggle() {
    isOpen.value = !isOpen.value
}

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
        <p>{{ currentItem }}</p>
    </div>
    <img @click="toggle" src="/icons/global/dropdown-arrow.svg" class="arrow hover" :class="{'arrow-ani': isOpen}">
    <Transition name="slide">
        <div v-if="isOpen" class="dropdown">
            <p class="hover" v-for="label in currentItemList" @click="changeItem(label)">
                {{ label }}
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

.filter p {
    font: var(--undertitle);
    color: var(--white);
    user-select: none;
}

.filter-title {
    color: var(--lower-tone)!important;
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
    right: 0;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    background-color: var(--background);
    padding: 0 1rem 0.3rem .3rem;
    border-radius: 0 0 var(--border-radius) var(--border-radius);
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