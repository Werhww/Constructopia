<template>
<div class="inventory-row">
    <BuildInventoryItem v-for="item in inventoryFixed" :block_image="item.block_image" :amount="item.amount" />
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    inventory: {
        amount: {
            amount: number
            stacks: boolean
        }
        block_image: string
    }[]
}>()

const inventoryFixed = computed(() => {
    const inventory = prop.inventory

    const inventoryFixed: {
        amount: {
            amount: number
            stacks: boolean
        }
        block_image: string
    }[] = []

    if (inventory.length == 9) {
        return inventory
    } else {
        for (let i = 0; i < 9; i++) {
            if (inventory[i]) {
                inventoryFixed.push(inventory[i])
            } else {
                inventoryFixed.push({
                    amount: {
                        amount: 0,
                        stacks: false
                    },
                    block_image: '/src/assets/blocks/air.png'
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