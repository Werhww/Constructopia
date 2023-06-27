<template>
<div class="inventory" v-if="loading">
    <BuildInventoryRow v-for="item in inventortFixedForRows" :inventory="item" />
</div>
<div class="loading-column" v-else>
    <div class="loading-item loading-animation" v-for="i in 9"></div>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    inventory: {
        amount: number
        block_image: string
        block_name: string
    }[]

    loading: boolean
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

.loading-column {
    display: flex;
    column-gap: 0.313rem;
    padding: 0.8rem 0.6rem;
    background-color: var(--inventory-background);
    width: fit-content;
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 0px 0.25rem rgba(0, 0, 0, .5));
}

.loading-item {
    position: relative;

    background-color: var(--inventory-item-background);
    border: solid 0.125rem var(--inventory-item-border);

    width: 2.375rem;
    height: 2.375rem;
    border-radius: 0.25rem;

    user-select: none;
}

.loading-animation {
    background-color: var(--dark)!important;
    background-image: linear-gradient(
        90deg,
        var(--dark) 20%,
        var(--lower-tone) 50%,
        var(--dark) 80%
    );
	background-size: 40px 100%;
	background-repeat: no-repeat;
	background-position: left -40px top 0; 
	animation: shine 1s ease infinite;
}

@keyframes shine {
	to {
		background-position: right -40px top 0;
	}
}
</style>