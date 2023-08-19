<template>
<div class="category-search">
    <div class="seach">
        <input type="text" placeholder="Search" v-model="search" />
    </div>
    <div class="recommendations" v-if="openRecommendations"></div>
</div>
</template>

<script setup lang="ts">
const search = ref('')
const openRecommendations = ref(false)

watch(search, (value) => {
    if(value.length == 0) {
        openRecommendations.value = false
        return
    }
    openRecommendations.value = true
})
</script>

<style scoped>
.category-search {
    position: relative;
}

.seach {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0.1rem 0.4rem;
    border: var(--lower-tone) 0.1rem solid;
    border-radius: calc(var(--border-radius) / 2);
}

.seach input {
    color: var(--white);
    width: stretch;
    height: 2.5rem;
    font: var(--text);
    
    border: none;
    outline: none;
    background-color: transparent;
}

.recommendations {
    position: absolute;
    top: 3rem;
    left: 0;
    width: 100%;
    height: 10rem;
    background-color: var(--dark);
    border-radius: calc(var(--border-radius) / 2);
    border: var(--lower-tone) 0.1rem solid;
}
</style>