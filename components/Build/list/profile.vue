<template>
<div class="wrapper">
    <div class="build-title">
       <h1>{{ title }}</h1>
       <p @click="router.push(`/builds/${builds[0].build.userId}`)">see more</p>
    </div>
    <div 
        class="build-items"
        v-dragscroll.x    
    >
        <BuildCardMin
            v-for="i in builds"

            :build="i.build"
        />
    </div>
</div>
</template>

<script setup lang="ts">
import { PreviewBuildData } from '~/utils/useTypes';
const router = useRouter()

defineProps<{
    title: string
    builds: PreviewBuildData[]
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