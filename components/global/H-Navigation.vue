<template>
<div class="nav-viewer">
    <div class="nav-item" v-for="nav in navigation">
            <NuxtLink :to="nav.path">{{ nav.title }}</NuxtLink>
        <p>/</p>
    </div>
</div>
</template>

<script setup lang="ts">
const route = useRoute()

let navigation = ref<{
    title: string
    path: string
}[]>([])

function newPath() {    
    navigation.value = []

    const path = route.path
    .split("/")
    .filter((path) => path !== "" && path !== "/")

    
    let index = 0

    for (const route of path) {
        navigation.value.push({
            title: route.replace(route[0], route[0].toUpperCase()),
            path: `/${path.slice(0, index + 1).join("/")}`
        })

        index++
    }
}

watch(route, () => {
    newPath()
})

onMounted(newPath)
</script>

<style scoped>
.nav-viewer {
    display: flex;
    align-items: center;
    gap: .3rem;
}

.nav-viewer p , .nav-item a{
    font: var(--text);
    color: var(--white-2);
    font-weight: 600;
    cursor: default;
    text-decoration: none;
}

.nav-viewer p {
    font-weight: 700;
}

.nav-item {
    display: flex;
    gap: 0.3rem;
}
</style>