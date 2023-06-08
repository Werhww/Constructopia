<template>
<div class="wrapper">
    <div class="build-title">
        <h1>{{ title }}</h1>
        <p @click="router.push(`/builds/${userId}`)">see more</p>
    </div>
    <div 
        class="build-items"
        v-dragscroll.x    
    >
        <BuildCard 
            v-for="i in 10"

            buildId="123"
            image="https://i.pinimg.com/736x/f5/c0/a2/f5c0a23a575e40913a2056441a30412b.jpg"
            title="House of the future"
            date="2023-05-18T15:00:00"
            user="John-Doe"
            difficulty="easy"
            blocks="5"
            views="100" 
            :liked="false"
        />
    </div>
</div>
</template>

<script setup lang="ts">
const router = useRouter()

/* Endre til å hente direkte fra auth */
/* userId skal ikke bruke i prod */
const userId = '123'

const prop = defineProps<{
    title: string
    builds?: Array<{
        image: string
        title: string
        date: string
        user: string
        difficulty: string
        blocks: string
        views: string
    }>
}>()
</script>

<style scoped> 
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.build-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.build-title > h1{
    font: var(--undertitle);
    color: var(--white);
}

.build-title > p{
    font: var(--text);
    color: var(--lower-tone);

    text-decoration: underline;
    font-weight: 700;
    cursor: pointer;
}

.build-items {
    display: flex;
    align-items: center;
    gap: 2.5rem;
    overflow: hidden;
    height: 21rem;
}

.build-items:hover {
    cursor: grab;
}

.build-items:active {
    cursor: grabbing;
}
</style>