<script setup lang="ts">
defineProps<{
    src: string
    name: string
    description: string
    
    views: number
    blocks: number

    username: string
    userId: string

    size: string
    difficulty: string

    categorys: {
        name: string
        id: string
    }[]
}>()

const categoryScroller = ref(false)
</script>

<template>
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
    <SystemFlex
        justify-content="space-between"
        align-items="center"
    >
            <h2 class="buildTitle">{{ name }}</h2>
        <SystemFlex gap="small">
            <SystemFlex align-items="center">
                <SystemIcon src="/icons/blocks.svg" size="small" ratio="height" />
                <span>{{ blocks }}</span>
            </SystemFlex>
            <SystemFlex align-items="center">
                <SystemIcon src="/icons/views.svg" size="tiny" ratio="height" />
                <span>{{ views }}</span>
            </SystemFlex>
        </SystemFlex>
    </SystemFlex>
    <SystemFlex
        gap="small"
    >
        <BuildUserAtSmall :username="username" :user-id="userId" />
        <SystemFlex 
            align-items="center"
            gap="tiny"    
        >
            <SystemIcon src="/icons/size.svg" size="tiny" ratio="height" color="grey" />
            <span class="grey">{{ size }}</span>
        </SystemFlex>
        <span class="grey">/{{ difficulty }}</span>
    </SystemFlex>
    <SystemFlex class="description"
        overflow="hidden"
    >
        <span>{{ description }}</span>
    </SystemFlex>

    <BuildCategoryScroller 
        :categorys="categorys" 
        :animation-on="categoryScroller"    
    />
</SystemFlex>
</template>

<style scoped lang="scss">
.buildCard {
    cursor: pointer;

    h2 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .description {
        transition: max-height 600ms ease-out;
        max-height: 0;

        span {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            color: var(--grey);
        }
    }
    
    .grey {
        color: var(--grey);
    }

    &:hover {
        .description {
            max-height: 5rem;
        }
    }
}
</style>