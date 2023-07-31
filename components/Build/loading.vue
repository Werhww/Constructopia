<template>
<section class="loading">
    <div class="image ani"></div>
    <div class="carousel">
        <div class="c-image ani"></div>
        <div class="c-image ani"></div>
        <div class="c-image ani"></div>
        <div class="c-image ani"></div>
        <div class="c-image ani"></div>
        <div class="c-image ani"></div>
    </div>
    <div class="text">
        <div class="t-title ani"></div>
        <div class="t-metadata ani"></div>
        <div class="t-inventory ani"></div>
        <div class="t-description ani"></div>
    </div>
</section>
</template>

<script setup lang="ts">

</script>

<style scoped>
.loading {
    display: flex;
    gap: 1rem;
}

.image {
    width: 42.5rem;
    height: 37.5rem;
    background-color: var(--loading-bg);
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

.carousel {
    width: 6.25rem;
    height: 37.5rem;
    display: flex;
    flex-direction: column;
    gap: .625rem;
}

.c-image {
    width: 100%;
    height: 100%;
    background-color: var(--loading-bg);
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

.text {
    display: flex;
    flex-direction: column;
    gap: .625rem;
}

.t-title {
    width: 25rem;
    height: 2.5rem;
    background-color: var(--loading-bg);
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

.t-metadata {
    width: 25rem;
    height: 1.25rem;
    background-color: var(--loading-bg);
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

.t-inventory {
    width: 25rem;
    height: 4rem;
    background-color: var(--loading-bg);
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

.t-description {
    width: 25rem;
    height: stretch;
    background-color: var(--loading-bg);
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.5rem rgba(0, 0, 0, 0.5));
}

/* loading ani */
.ani{
    animation: loading 1s infinite;
}

@keyframes loading {
    0% {
        background-color: var(--loading-bg);
    }
    50% {
        background-color: var(--loading-bg-2);
    }
    100% {
        background-color: var(--loading-bg);
    }
}

</style>