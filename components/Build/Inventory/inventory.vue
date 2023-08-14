<template>
<div class="inventory">
    <BuildInventoryRow v-for="item in inventortFixedForRows" :inventory="item" />
</div>
</template>

<script setup lang="ts">
import { 
    InventoryDocument,
    InventoryItemFixedForRows
} from '~/utils/useTypes';

const prop = defineProps<{
    inventory: InventoryDocument[]
}>()

const inventortFixedForRows = computed(()=>{
    const inventory = prop.inventory

    const inventoryFixedForRows: InventoryItemFixedForRows[][] = []

    let currentRow: InventoryItemFixedForRows[] = []

    for (let i = 0; i < inventory.length; i++) {
        if (currentRow.length == 9) {
            inventoryFixedForRows.push(currentRow)
            currentRow = []
        }
        
        const { count, block, buildId } = inventory[i]

        if(count < 64) {
            currentRow.push({
                count: count,
                stack: false,
                block,
                buildId
            })
        } else {
            const stacks = Math.floor(count / 64)
            const remainder = (count - (64*stacks))

            currentRow.push({
                count: stacks,
                stack: true,
                block,
                buildId
            })

            if (currentRow.length == 9) {
                inventoryFixedForRows.push(currentRow)
                currentRow = []
            }   

            currentRow.push({
                count: remainder,
                stack: false,
                block,
                buildId
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
    height: fit-content;
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.25rem rgba(0, 0, 0, .5));
}
</style>