<template>
<div class="inventory-row">
    <BuildInventoryItem v-for="item in inventoryFixed" :block="item.block" :stack="item.stack" :count="item.count" />
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    inventory: {
        stack: boolean
        buildId: string
        block: string
        count: number
    }[]
}>()

const inventoryFixed = computed(() => {
    const inventory = prop.inventory

    const inventoryFixed: {
        stack: boolean
        buildId: string
        block: string
        count: number
    }[] = []

    if (inventory.length == 9) {
        return inventory
    } else {
        for (let i = 0; i < 9; i++) {
            if (inventory[i]) {
                inventoryFixed.push(inventory[i])
            } else {
                inventoryFixed.push({
                    stack: false,
                    buildId: 'empty',
                    block: 'minecraft:air',
                    count: 0
                })
            }
        }
        return inventoryFixed
    }
})
</script>

<style scoped>
.inventory-row {
    display: flex;
    column-gap: 0.313rem;
}
</style>