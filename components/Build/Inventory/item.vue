<template>
<div class="inventory-item">
    <img :src="block_image_src">
    <p class="stacks-text" v-if="stack">x64</p>
    <p class="amount-text">{{ fixedCount }}</p>

    <div class="tooltip" v-if="needTooltip">
        <p>{{ block }}</p>
    </div>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    stack: boolean
    block: string
    count: number
}>()

const block_image_src = computed(() => {
    const block = prop.block.split(":")[1]
    
    return '/blocks/' + block + '.png'
    
})

const fixedCount = computed(() => {
    if (prop.count == 0) {
        return " "
    } else {
        return prop.count
    }
})

const needTooltip = computed(() => {
    if (prop.count == 0) {
        return false
    } else {
        return true
    }
})

</script>

<style scoped>
.inventory-item {
    position: relative;

    background-color: var(--inventory-item-background);
    border: solid 0.125rem var(--inventory-item-border);

    width: 2.375rem;
    height: 2.375rem;
    border-radius: 0.25rem;

    user-select: none;
}

.inventory-item > img {
    width: 1.875rem;
    height: 1.875rem;
    object-fit: cover;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.amount-text {
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--white);
    z-index: 10;

    position: absolute;
    bottom: 0.125rem;
    right: 0.125rem;
}

.stacks-text {
    font-size: 0.6rem;
    color: var(--white);
    z-index: 10;

    position: absolute;
    bottom: 0.8rem;
    right: 0;
}

.inventory-item:hover > .tooltip {
    display: block;
}

.tooltip {
    user-select: text;

    display: none;
    position: absolute;
    top: 1.5rem;
    left: 2.4rem;
    z-index: 100;

    padding: 0.3rem;
    border-radius: var(--border-radius);
    filter: drop-shadow(0 0 0.25rem rgba(0, 0, 0, 0.5));

    color: var(--white);
    background-color: var(--inventory-item-background);
}
</style>