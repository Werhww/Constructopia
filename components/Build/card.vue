<template>
<div class="item">
    <AnimationsLike v-on:like="like_build" :liked="liked" class="like-button"/>

    <img class="image" :src="image" @mousedown="mouseDownX = $event.clientX" @mouseup="open_build_check">
    <div class="item-data" @mousedown="mouseDownX = $event.clientX" @mouseup="open_build_check">
        <h1 class="title">{{ title }}</h1>
        <div class="meta-data">
            <p>{{ formatedDate }}</p>
            <p>@{{ user }}</p>
            <p>/{{ difficulty }}</p>
        </div>
        <div class="meta-data thick-data">
            <p>{{ blocks }} Blocks</p>
            <div class="views">
                <img src="/icons/build/view-icon.svg">
                <p>{{ views }}</p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
import moment from 'moment'

const router = useRouter()

const prop = defineProps<{
    buildId: string
    image: string
    title: string
    date: string
    user: string
    difficulty: string
    blocks: string
    views: string
    liked: boolean
}>()

const formatedDate = computed(() => {
    return moment(prop.date).format('YYYY MMMM Do')
})

let mouseDownX = 0
let mouseUpX = 0

function between(x:number, min:number, max:number) {
    return x >= min && x <= max;
}

function open_build_check(e: MouseEvent) {
    mouseUpX = e.clientX
    if (between(mouseUpX, mouseDownX - 15, mouseDownX + 15)) {
        router.push(`/build/${prop.buildId}`)
    }
}

function like_build(likeValue: boolean) {
    console.log(likeValue)
    /* firebase function */
}
</script>

<style scoped>

.item:hover .like-button{
    opacity: 1;
}
.item:hover {
    transform: scale(1.02);
    filter: brightness(0.8) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.582));
    cursor: pointer;
}

.item {
    display: flex;
    flex-direction: column;
    width: 15rem;

    transition: all 0.2s ease-in-out;
    user-select: none;

    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.image {
    border-radius: 1rem 1rem 0 0;
    width: 15rem;
    height: 13.438rem;
    object-fit: cover;

    transition: all 0.2s ease-in-out;
}

.item-data {
    display: flex;
    flex-direction: column;
    gap: 1px;

    background-color: var(--dark);

    padding: 0.25rem 0.5rem 1rem 0.5rem;
    border-radius: 0 0 1rem 1rem;
}

.title {
    font: var(--text);
    color: var(--white);
}

.meta-data {
    display: flex;
    gap: 0.688rem;

    font: var(--metadata);
    color: var(--lower-tone);
}

.meta-data {
    font-weight: 700;
}

.views {
    display: flex;
    gap: 0.25rem;
}

.like-button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;

    transition: all 0.2s ease-in-out;
    opacity: 0;
    filter: brightness(1.5);
}
</style>