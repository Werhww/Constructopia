<template>
<section class="new-build">
    <ComponentImageImport />
    <div class="build-details">
        <ComponentInput v-model="title" class="build-title" placeholder="title" font_size="2.5rem" width="100%" :maxlength="35"/>
        <div class="build-undertitel">
            <BuildOpenDifficulty v-model="difficulty" :white="true" /> 
            <div class="build-file-import">
                <img src="/icons/build/import-build.svg">
                <p>build file</p>
                <p>?</p>
            </div>
            <div class="build-open-3d">
                <img src="/icons/build/3d-icon-inverted.svg">
                <p>open 3d editor</p>
            </div>
        </div>
    </div>
    <div>
        
    </div>
</section>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'New Build'
})
const title = ref('')
const difficulty = ref('easy')
</script>

<style scoped>
.new-build {
    display: flex;
    gap: 0.625rem;
}

.build-details {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}


.build-undertitel {
    display: flex;
    gap: 1.2rem;
}

.build-file-import, .build-open-3d{
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

.build-open-3d {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
}
</style>