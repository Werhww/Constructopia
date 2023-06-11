<template>
<div class="build-file-import">
    <input v-on:change="importLitematic" class="litematic-import" ref="litematicInput" type="file" accept=".litematic">
    <img @click="litematicImport" src="/icons/build/import-build.svg">
    <p @click="litematicImport">{{ build_name }}</p>
    <p>?</p>
</div>
</template>

<script setup lang="ts">
const build_name = ref('build file')
const litematicInput = ref()

function litematicImport(){
    litematicInput.value.click()
}

function importLitematic(){
    console.log(litematicInput.value.files[0].name)
    build_name.value = litematicInput.value.files[0].name
}

</script>

<style scoped>
.build-file-import{
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font: var(--undertitle);
    color: var(--white);
    cursor: pointer;
}

.build-file-import p:last-child{
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    cursor: help;
}
.litematic-import {
    user-select: none;
    
    position: absolute;
    top: 20vh;
    left: 70vw;
    opacity: 0;
}
</style>