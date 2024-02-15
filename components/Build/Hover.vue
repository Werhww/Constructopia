<script setup lang="ts">

defineProps<{
    fileExtension: string
    createdAt: Date
    updatedAt: Date

    title: string
    description: string
    categorys: {
        name: string
        id: string
    }[]
}>()
</script>

<template>
<SystemFlex class="hoverCard"
    width="18.75rem"
    direction="column"
    background="dark" 
    padding="normal" 
    gap="small"
    radius="outer"
    shadow="on"
>
    <h2>{{ title }}</h2>
    <span class="grey">
        Created at: <span class="greyThick">{{ useDateFormat(createdAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Last changed: <span class="greyThick">{{ useDateFormat(createdAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Categoryies: 
    </span>
    
    <span class="light-greyThick description">{{ description }}</span>


    <SystemFlex class="buttons"
        justify-content="space-between"
        align-items="flex-end"
        height="2rem"
    >
        <SystemFlex
            gap="small"
        >
            <SystemIcon src="/icons/like.svg" size="medium" ratio="height" />
            <SystemIcon src="/icons/thumpsUp.svg" size="medium" />
            <SystemIcon src="/icons/thumpsUp.svg" size="medium" style="transform: rotate(180deg);" />
            <SystemIcon src="/icons/share.svg" size="medium" ratio="height" />
        </SystemFlex>

        <SystemIcon src="/icons/arrowRight.svg" size="medium" ratio="width"/>
    </SystemFlex>

    <span class="fileExtension">{{ fileExtension }}</span>
</SystemFlex>
</template>

<style scoped lang="scss">
.hoverCard {
    position: relative;
    min-height: 15.5rem;
    overflow: hidden;



    h2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .description {
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .fileExtension {
        background-color: var(--red);
        padding: 0.2rem 0.5rem;
        border-radius: 0.188rem;

        box-shadow: var(--shadow);

        position: absolute;

        left: 0;
        top: 0;
    }

    .buttons {
        img {
            cursor: pointer;
        }
    }

}
</style>