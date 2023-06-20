<template>
<div class="build-file-import">
    <input v-on:change="importLitematic" class="litematic-import" ref="litematicInput" type="file" accept=".litematic">
    <img @click="litematicImport" src="/icons/build/import-build.svg">
    <p @click="litematicImport">{{ build_name }}</p>
    <p class="import-info">?</p>
    <div class="descripton">
        We take use of the <a href="https://www.curseforge.com/minecraft/mc-mods/litematica" target="_blank" rel="noopener noreferrer">litematica mod</a> to import builds.
        Litematic is a file format that contains a Minecraft build.
        <span><NuxtLink to="/build/litematica">Learn more</NuxtLink></span>
    </div>
</div>
</template>

<script setup lang="ts">
const build_name = ref('build file')
const litematicInput = ref()

const emit = defineEmits(['litematic-imported'])

function litematicImport(){
    litematicInput.value.click()
}

async function importLitematic(event: any){
    build_name.value = event.target.files[0].name
    emit('litematic-imported', event.target.files[0])
}

</script>

<style scoped>
.build-file-import{
    display: flex;
    position: relative;
    align-items: center;
    gap: 0.4rem;
    font: var(--undertitle);
    color: var(--white);
    cursor: pointer;
}

.litematic-import {
    user-select: none;
    
    position: absolute;
    top: 20vh;
    left: 70vw;
    opacity: 0;
}

.import-info {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    cursor: help;
}

.import-info:hover + .descripton, .descripton:hover {
    display: block;
    opacity: 1;
}
.descripton {
    display: none;
    animation: fade-in 0.3s ease-in-out forwards;

    position: absolute;
    top: 1.5rem;
    left: 0;

    width: 30rem;
    height: fit-content;
    border-radius: 0.3rem;
    padding: .8rem;

    z-index: 100;
    background-color: var(--dark);
    font: var(--text);
    color: var(--white);

    transition: opacity 0.2s ease-in-out;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.descripton > a{
    color: var(--white);
}

.descripton > span{
    display: block;
    font-size: 1rem;
    width: 100%;
    text-align: right;
}

.descripton > span > a{
    color: var(--white);
}
</style>