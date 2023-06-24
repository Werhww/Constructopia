<template>
<div class="loadingStatus">
    <div>
        <p>Upload started:</p>
        <p v-if="uploadStarted">true</p>
        <AnimationsLoading v-else :full-screen="false" class="loadingAnimation"/>
    </div>
    <div>
        <p>Build info uploaded:</p>
        <p v-if="document">true</p>
        <AnimationsLoading v-else :full-screen="false" class="loadingAnimation"/>
    </div>
    <div>
        <p>Images uploaded:</p>
        <p v-if="images">true</p>
        <AnimationsLoading v-else :full-screen="false" class="loadingAnimation"/>
    </div>
    <div>
        <p>Litematic file uploaded:</p>
        <p v-if="litematic">true</p>
        <AnimationsLoading v-else :full-screen="false" class="loadingAnimation"/>
    </div>
    <div>
        <p>Inventory uploaded:</p>
        <p v-if="inventory">true</p>
        <AnimationsLoading v-else :full-screen="false" class="loadingAnimation"/>
    </div>
</div>
</template>

<script setup lang="ts">
defineProps<{
    uploadStarted: boolean;
    document: boolean;
    images: boolean;
    litematic: boolean;
    inventory: boolean;
}>()
</script>

<style scoped>
.loadingStatus {
    position: absolute;
    top: 5vh;
    left: 2vw;

    z-index: 11;

    color: var(--white);
    font: var(--undertitle);
    font-weight: 500;

    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.loadingStatus div {
    display: flex;
    gap: 1.3rem;
}

.loadingStatus div p:nth-child(2) {
    color: var(--green);
}

.loadingAnimation {
    height: 1.5rem;

    z-index: 11;
}
</style>