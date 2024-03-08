<script setup lang="ts" >
const props = defineProps<{
    build: NoServerFunctionErrors<ServerFunctionResult<"findBuild">>

}>()


</script>

<template>
<div class="hoverCard">
    <h2>{{ build?.name }}</h2>
    <span class="grey">
        Created at: <span class="greyThick">{{ useDateFormat(build?.createdAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Last changed: <span class="greyThick">{{ useDateFormat(build?.updatedAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Categoryies: 
        <BuildCategoryText v-for="item in build?.category" 
            :name="item.name" 
            :id="item.id"
        />
    </span>
    
    <span class="light-greyThick description">{{ build?.description }}</span>
    <span class="grey">
        Avalible in: <!-- <span class="greyThick" v-for="item in fileExtensions">{{ item }}, </span> -->
    </span>


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
</div>
</template>

<style scoped lang="scss">
.hoverCard {
    min-height: 15.5rem;
    

    position: absolute;
    top: 4rem;
    left: 17rem;
    z-index: 100;

    display: flex;
    flex-direction: column;
    gap: var(--gap-small);
    
    width: 18.75rem;
    padding: var(--pad-normal);
    border-radius: var(--rad-outer);
    
    background-color: var(--dark); 
    box-shadow: var(--shadow);



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