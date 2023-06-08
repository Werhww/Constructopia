<template>
<div class="inventory-item">
    <img :src="block_image">
    <p class="stacks-text" v-if="amount.stacks">x64</p>
    <p class="amount-text">{{ fixedAmount }}</p>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    amount: {
        amount: number
        stacks: boolean
    }
    block_image: string
}>()

const fixedAmount = computed(() => {
    if (prop.amount.amount == 0) {
        return " "
    } else {
        return prop.amount.amount
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
</style>