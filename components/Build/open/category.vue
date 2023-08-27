<template>
<div class="category-card" @mouseover="hoverCategory" @mouseout="popup = false">
    <p>{{ name }}</p>


    <div v-if="popup" class="category-popup">
        <LazyAnimationsDots v-if="loading" />

        <p v-if="!loading" class="name">{{ popupData.name }}</p>
        <p v-if="!loading" class="text">{{ popupData.description }}</p>
        <p v-if="!loading" class="text">{{ popupData.count }} builds</p>
    </div>
</div>
</template>

<script setup lang="ts">
import { CategoryCard } from '~/models/category'
const prop = defineProps<{
    name: string
}>()

const popup = ref(false)
const loading = ref(true)
const popupData = ref({
    id: '',
    name: '',
    description: '',
    count: 0
})

const category = new CategoryCard(prop.name)

function hoverCategory() {
    popup.value = true
    category.getCategory().then((data) => {
        popupData.value = data
        loading.value = false
    })
}

</script>

<style scoped>
.category-card {
    position: relative;

    color: var(--white);
    font: var(--text);

    width: fit-content;
    padding: 0.5rem 1rem;

    border: var(--lower-tone) 0.1rem solid;
    border-radius: calc(var(--border-radius) / 2);
}

.category-card:hover {
    background-color: var(--lower-tone);
    cursor: pointer;
}

.category-popup {
    position: absolute;
    top: 2.5rem;
    left: 0;
    z-index: 10;

    width: 15rem;

    background-color: var(--dark);
    border: var(--lower-tone) 0.1rem solid;
    border-radius: calc(var(--border-radius) / 2);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.name {
    color: var(--white);
    font: var(--text);
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden;
}

.text {
    font: var(--text);
    font-size: 0.8rem;
    color: var(--lower-tone);
}

</style>