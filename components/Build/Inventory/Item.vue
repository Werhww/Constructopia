<script setup lang="ts">
const props = defineProps<{
    blockId: string
    amount: number
}>()

const imageLink = computed(() => "/blocks/" + props.blockId + ".png")
</script>

<template>
<SystemToolTip :text="blockId" :timeout="100">
    <SystemFlex class="item"
        direction="column" 
        padding="small" 
        radius="small" 
        align-items="center" 
        justify-content="center"
    
        width="fit-content"
        height="fit-content"
    >
        <SystemIcon :src="imageLink" size="large" :alt="blockId" />
        <span>{{ amount }}</span>
    </SystemFlex>
</SystemToolTip>

</template>

<style scoped lang="scss">
.item {
    border: 2px solid var(--grey);
    transition: all 300ms ease-in-out;

    img {
        opacity: 0.7;
        transition: all 300ms ease-in-out;
    }

    span {
        color: var(--grey);
        transition: all 300ms ease-in-out;
    }

    &:hover {
        border: 2px solid #fff;

        img {
            opacity: 1;
        }

        span {
            color: #fff;
        }
    }
}
</style>