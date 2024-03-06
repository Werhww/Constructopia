<script setup lang="ts">


interface OldProps {
    name: string
    description: string
    
    views: number
    blocks: number
    downloads: number

    username: string
    userId: string

    size: string
    difficulty: string

    fileExtensions: string[]
    images: string[]

    categorys: {
        name: string
        id: string
    }[]
}

const props = defineProps<{
    id: number
}>()

const data = await serverFunction("findBuild", props.id)
if (isServerError(data)) throw createError("Build not found")


const categoryScroller = ref(false)
</script>

<template>

<div class="buildWrapper">
    <SystemFlex class="buildCard"
        direction="column"
        gap="small"
        padding="normal" 
        background="dark" 
        radius="outer"
    
        @mouseenter="categoryScroller = true"
        @mouseleave="categoryScroller = false"
    
        width="16.375rem"
    >
        <SystemFlex radius="inner" overflow="hidden" height="12.5rem">
            <img style="width: 100%; height: 100%; object-fit: cover;" :src="data?.images[0]" :alt="data?.name">
        </SystemFlex>
        <h2 class="buildTitle">{{ data?.name }}</h2>
    
        <SystemFlex gap="small">
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/blocks.svg" size="small" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ data?.blockCount }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/views.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ data?.views }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="tiny">
                <SystemIcon src="/icons/download.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ data?.downloads }}</span>
            </SystemFlex>
        </SystemFlex>
        <SystemFlex
            gap="small"
        >
            <BuildUsername :username="data?.user.minecraftName" :user-id="data?.user.id" />
            <SystemFlex 
                align-items="center"
                gap="4px"   
            >
                <SystemIcon src="/icons/size.svg" size="tiny" ratio="height" color="grey" />
                <span class="greyThick">{{ data?.size }}</span>
            </SystemFlex>
            <span class="greyThick">/{{ data?.difficulty }}</span>
        </SystemFlex>
    </SystemFlex>

    <BuildHover
        :title="data?.name!"
        :description="data?.description!"
        :categorys="data?.category!"
        :file-extensions="['ntb']"
        :createdAt="data?.createdAt!"
        :updatedAt="data?.updatedAt!"
    />
</div>
</template>

<style scoped lang="scss">
.buildWrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
}

.buildCard {
    cursor: pointer;
    position: relative;
    overflow: hidden;

    h2 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}
</style>