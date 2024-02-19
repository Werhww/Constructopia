<script setup lang="ts">
defineProps<{
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
}>()

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
        <SystemFlex radius="inner" overflow="hidden">
            <img :src="images[0]" :alt="name">
        </SystemFlex>
        <h2 class="buildTitle">{{ name }}</h2>
    
        <SystemFlex gap="small">
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/blocks.svg" size="small" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ blocks }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/views.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ views }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="tiny">
                <SystemIcon src="/icons/download.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ downloads }}</span>
            </SystemFlex>
        </SystemFlex>
        <SystemFlex
            gap="small"
        >
            <BuildUsername :username="username" :user-id="userId" />
            <SystemFlex 
                align-items="center"
                gap="4px"   
            >
                <SystemIcon src="/icons/size.svg" size="tiny" ratio="height" color="grey" />
                <span class="greyThick">{{ size }}</span>
            </SystemFlex>
            <span class="greyThick">/{{ difficulty }}</span>
        </SystemFlex>
    </SystemFlex>

    <BuildHover
        :title="name"
        :description="description"
        :categorys="categorys"
        :file-extensions="fileExtensions"
        :createdAt="new Date()"
        :updatedAt="new Date()"
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