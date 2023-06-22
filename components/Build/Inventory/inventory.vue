<template>
<div class="inventory">
    <BuildInventoryRow v-for="item in inventortFixedForRows" :inventory="item" />
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    inventory: {
        amount: number
        block_image: string
        block_name: string
    }[]
}>()

const inventortFixedForRows = computed(()=>{
    const inventory = prop.inventory
    const inventoryFixedForRows: {
        amount: {
            amount: number
            stacks: boolean
        }
        block_image: string
        block_name: string
    }[][] = []

    let currentRow: {
        amount:  {
            amount: number
            stacks: boolean
        }
        block_image: string
        block_name: string
    }[] = []

    for (let i = 0; i < inventory.length; i++) {
        if (currentRow.length == 9) {
            inventoryFixedForRows.push(currentRow)
            currentRow = []
        }
        
        const { amount, block_image, block_name } = inventory[i]

        if(amount < 64) {
            currentRow.push({
                amount: {
                    amount,
                    stacks: false
                },
                block_image,
                block_name
            })
        } else {
            const stacks = Math.floor(amount / 64)
            const remainder = (amount - (64*stacks))

            currentRow.push({
                amount: {
                    amount: stacks,
                    stacks: true
                },
                block_image,
                block_name
            })

            if (currentRow.length == 9) {
                inventoryFixedForRows.push(currentRow)
                currentRow = []
            }   

            currentRow.push({
                amount: {
                    amount: remainder,
                    stacks: false
                },
                block_image,
                block_name
            })
        }

        if (i == inventory.length - 1) {
            inventoryFixedForRows.push(currentRow)
        }
    }

    return inventoryFixedForRows
})
</script>

<style scoped>
.inventory {
    display: flex;
    flex-direction: column;
    row-gap: 0.313rem;
    padding: 0.8rem 0.6rem;
    background-color: var(--inventory-background);
    width: fit-content;
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.25rem rgba(0, 0, 0, .5));
}
</style>