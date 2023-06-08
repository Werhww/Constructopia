<template>
<div class="wrapper">
    <h1>{{ title }}</h1>
    <div 
        class="build-items"
        v-dragscroll.x    
    >
        <BuildCard
            v-for="i in 10"

            buildId="1"
            image="https://i.pinimg.com/736x/f5/c0/a2/f5c0a23a575e40913a2056441a30412b.jpg"
            title="House of the future"
            date="2023-05-18T15:00:00"
            user="John-Doe"
            difficulty="easy"
            blocks="5"
            views="100" 
            :liked="false"
        />

        <BuildLastCard />
    </div>
</div>
</template>

<script setup lang="ts">

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


.wrapper > h1{
    font: var(--undertitle);
    color: var(--white);
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