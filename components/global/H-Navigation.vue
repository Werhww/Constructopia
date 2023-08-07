<template>
<div class="nav-viewer">
    <div class="nav-item" v-for="nav in navigationRoute">
        <NuxtLink :to="nav.path">{{ nav.name }}</NuxtLink>
        <p>/</p>
    </div>
</div>
</template>

<script setup lang="ts">
const router = useRouter()

const navigationRoute = ref<any[]>([])
const NAVAGATIONROUTES = [
    {
        name: 'Home',
        path: '/'
    },
    {
        name: 'about',
        path: '/about'
    },
    {
        name: 'build',
        path: '/builds/'
    }, 
    {
        name: 'builds',
        path: '/builds/'
    }, 
    {
        name: 'favorites',
        path: '/favorites/'

    },
    {
        name: 'profile',
        path: '/profile/'
    },
    {
        name: 'litematica',
        path: '/litematica/'
    },
    {
        name: 'new-build',
        path: '/new-build/'
    }
]


router.beforeEach((to, from, next) => {
    const SPLITPATH = to.path.split('/')
    let showRoute:any[] = []

    for(let i = 0; i < SPLITPATH.length; i++) {
        if(i == 0) {
            showRoute.push(NAVAGATIONROUTES[0])
        } else {
            for(let j = 0; j < NAVAGATIONROUTES.length; j++) {
                if(NAVAGATIONROUTES[j].name == SPLITPATH[i]) {
                    showRoute.push(NAVAGATIONROUTES[j])
                }
            }
        }
    }

    navigationRoute.value = showRoute
    next()
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

.nav-item {
    display: flex;
    gap: 0.3rem;
}
</style>