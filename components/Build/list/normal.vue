<template>
<div class="wrapper">
    <h1>{{ title }}</h1>
    <div 
        class="build-items"
        v-dragscroll.x    
    >
        <BuildCard
            v-for="i in builds"

            :build="i.build"
            :images="i.images"
        />

        <BuildLastCard />
    </div>
</div>
</template>

<script setup lang="ts">
defineProps<{
    title: string
    builds: {
        build: {
            buildId: string

            userId: string
            username: string

            thumbnailIndex: number

            title: string
            description: string
            difficulty: string
            blocks: number

            views: number

            date: {
                created: any
                lastEdit: any
            }
        }

        images: {
            buildId: string
            links: string[]
        }
    }[]
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