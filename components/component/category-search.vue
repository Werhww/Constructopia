<template>
<div class="category-search">
    <div class="seach">
        <input type="text" placeholder="Search" v-model="search" />
    </div>
    <div class="recommendations" v-if="openRecommendations" v-dragscroll.x  >
        <ComponentCategoryItem 
        v-if="!loading && !noCategorys"
        v-for="category in categorys"
        :category="category"/>
        <AnimationsDots class="loading" v-if="loading"/>
        <p v-if="!loading && noCategorys">No categorys found</p>
    </div>
</div>
</template>

<script setup lang="ts">
import { CatergoryDocument } from '~/utils/useTypes';

const search = ref('')
const categorys = ref<CatergoryDocument[]>([])
const openRecommendations = ref(false)

const loading = ref(true)
const noCategorys = ref(false)

let seachWatch: NodeJS.Timeout | null = null


watch(search, (value) => {
    if (seachWatch) clearTimeout(seachWatch)
    if(value.length == 0) {
        openRecommendations.value = false
        return
    }

    openRecommendations.value = true 
    loading.value = true
    seachWatch = setTimeout(() => {
        seachCategory(value).then((res) => {
            categorys.value = res
            console.log(res)
            loading.value = false
        }).catch(() => {
            loading.value = false
            noCategorys.value = true
        })
        seachWatch = null
    }, 500)
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
    display: flex;
    overflow: hidden;

    position: absolute;
    top: 3rem;
    left: 0;
    width: 100%;
    height: 10rem;
    background-color: var(--dark);
    border-radius: calc(var(--border-radius) / 2);
    border: var(--lower-tone) 0.1rem solid;
}

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>