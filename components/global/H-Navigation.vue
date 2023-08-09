<template>
<div class="nav-viewer">
    <div class="nav-item" v-for="nav in navigation">
            <NuxtLink :to="nav.path">{{ nav.title }}</NuxtLink>
        <p>/</p>
    </div>
</div>
</template>

<script setup lang="ts">
const router = useRouter();
const route = useRoute();

let navigation = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Builds",
        path: "/12351235"
    },
    {
        title: "build",
        path: "/12351235"
    }
]

onMounted(()=> {
    console.log(route.path)

    let split = route.path.split("/")

    console.log(split)
})
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