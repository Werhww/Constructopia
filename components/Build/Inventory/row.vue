<template>
<div class="inventory-row">
    <BuildInventoryItem v-for="item in inventoryFixed" :block_image="item.block_image" :amount="item.amount" :block_name="item.block_name" />
</div>
</template>

<script setup lang="ts">
import air from '/icons/build/air.png'

const prop = defineProps<{
    inventory: {
        amount: {
            amount: number
            stacks: boolean
        }
        block_image: string
        block_name: string
    }[]
}>()

const inventoryFixed = computed(() => {
    const inventory = prop.inventory

    const inventoryFixed: {
        amount: {
            amount: number
            stacks: boolean
        }
        block_image: any
        block_name: string
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
                    block_image: air,
                    block_name: ""
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