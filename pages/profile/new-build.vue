<template>
<section class="new-build">
    <ComponentImageImport />
    <div class="build-details">
        <ComponentInput v-model="title" class="build-title" placeholder="title" font_size="2.5rem" width="100%" :maxlength="35"/>
        <div class="build-undertitel">
            <BuildOpenDifficulty v-model="difficulty" :white="true" /> 
            <div class="build-file-import">
                <img src="" >
                <p>build file</p>
                <p>?</p>
            </div>
        </div>
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
    gap: 0.4rem;
}

.build-file-import {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}
</style>