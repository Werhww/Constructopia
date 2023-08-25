<template>
<header>
    <div>
        <h1 class="title" @click="router.push('/builds')">{{ title }}</h1>
        <HNavigation />
    </div>
    <nav class="buttons">
        <HSearch />
        <HDropdown/>
    </nav>
</header>
</template>

<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const title = ref('')

const HeaderDropdownState = ref(false)

function updateDropdownState(value: boolean) {
    HeaderDropdownState.value = value
}

router.afterEach((to, from) => {
    updateDropdownState(false)
    title.value = to.meta.title as string
})

onMounted(() => {
    title.value = route.meta.title as string
})
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: var(--white-2);
}

.title {
    font: var(--title);
    cursor: default;
}

.buttons {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>