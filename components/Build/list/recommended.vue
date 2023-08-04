<template>
<div class="wrapper">
    <div class="build-title">
        <h1>{{ title }}</h1>
        <p @click="router.push(`/builds/${categoryId}`)">see more</p>
    </div>
    <div 
        class="build-items"
        v-dragscroll.x    
    >
        <BuildCard
            v-for="i in builds"

            :build="i.build"
            :images="i.images"
        />
    </div>
</div>
</template>

<script setup lang="ts">
const router = useRouter()

defineProps<{
    title: string
    categoryId: string

    builds?: {
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