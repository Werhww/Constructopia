<script setup lang="ts">
defineProps<{
    src: string
    name: string
    description: string
    
    views: number
    blocks: number
    downloads: number

    username: string
    userId: string

    size: string
    difficulty: string

    fileExtension: string

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
            <img :src="src" :alt="name">
        </SystemFlex>
        <h2 class="buildTitle">{{ name }}</h2>
    
        <SystemFlex gap="small">
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/blocks.svg" size="small" ratio="height" color="light-grey" />
                <span class="light-grey">{{ blocks }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/views.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-grey">{{ views }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="tiny">
                <SystemIcon src="/icons/download.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-grey">{{ downloads }}</span>
            </SystemFlex>
        </SystemFlex>
        <SystemFlex
            gap="small"
        >
            <BuildUserAtSmall :username="username" :user-id="userId" />
            <SystemFlex 
                align-items="center"
                gap="4px"   
            >
                <SystemIcon src="/icons/size.svg" size="tiny" ratio="height" color="grey" />
                <span class="grey">{{ size }}</span>
            </SystemFlex>
            <span class="grey">/{{ difficulty }}</span>
        </SystemFlex>
    
        <span class="fileExtension">{{ fileExtension }}</span>
    </SystemFlex>

    <BuildHover class="hoverCard"
        :title="name"
        :description="description"
        :categorys="categorys"
        :file-extension="fileExtension"
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

    .hoverCard {
        position: absolute;
        top: 4rem;
        left: 17.375rem;
        z-index: 100;
    }
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

    .fileExtension {
        background-color: var(--red);
        padding: 0.2rem 0.5rem;
        border-radius: 0.188rem;

        box-shadow: var(--shadow);

        position: absolute;

        left: 0;
        top: 0;
    }
}
</style>