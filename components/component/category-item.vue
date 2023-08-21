<template>
<div class="category-item"
    @mousedown="mouseDownX = $event.clientX"
    @mouseup="open_category_check"

>
    <div class="top">
        <p class="title">{{ category.name }}</p>
        <p class="count">{{ category.count }} uses</p>
    </div>

    <p class="description">{{ category.description }}</p>
</div>
</template>

<script setup lang="ts">
import { CatergoryDocument } from '@/utils/useTypes'
const router = useRouter()

const prop = defineProps<{
    category: CatergoryDocument
}>()

let mouseDownX = 0
let mouseUpX = 0

function open_category_check(e: MouseEvent) {
    mouseUpX = e.clientX
    if (dragOpenCheck(e, mouseDownX, mouseUpX)) {
        /* router.push(`/builds/${prop.category.id}`) */
        console.log('open category')
    }
}
</script>

<style scoped>
.category-item {
    margin: 0.5rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--white);

    width: 8rem;
    height: stretch;

    border: var(--lower-tone) 0.1rem solid;
    border-radius: calc(var(--border-radius) / 2);
}

.top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.title {
    font: var(--text);
    font-weight: 700;
    text-overflow: ellipsis;
    overflow: hidden;
}

.count {
    font: var(--text);
    font-size: .8rem;
    color: var(--lower-tone);
    font-weight: 700;
    width: 4rem;
}

.description {
    font: var(--text);
    font-weight: 500;
    font-size: .8rem;
    color: var(--lower-tone);

    text-overflow: ellipsis;
    overflow: hidden;
}

</style>