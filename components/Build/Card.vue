<script setup lang="ts">
import { usePreferredReducedMotion } from '@vueuse/core';
const motion = usePreferredReducedMotion()

const props = defineProps<{
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
</script>

<template>
<SystemFlex class="buildCard"
    direction="column"
    gap="small"
    padding="normal" 
    background="dark" 
    radius="outer"

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
    <SystemFlex class="tinyStuff"
        gap="small"
    >
        <BuildUserAtSmall :username="username" :user-id="userId" />
        <SystemFlex 
            align-items="center"
            gap="tiny"    
        >
            <SystemIcon src="/icons/size.svg" size="tiny" ratio="height" color="grey" />
            <span>{{ size }}</span>
        </SystemFlex>
        <span>/{{ difficulty }}</span>
    </SystemFlex>
    <SystemFlex class="description"
        overflow="hidden"
        :data-motion="motion"
    >
        <span>{{ description }}</span>
    </SystemFlex>

    <BuildCategoryScroller 
        :categorys="categorys" 
        :animation-on="false"    
    />
</SystemFlex>
</template>

<style scoped lang="scss">
.buildCard {
    h2 {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .description {
        &[data-motion="reduce"] {
            display: none;
        }

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
    
    .tinyStuff {
        span {
            color: var(--grey);
        }
    }

    &:hover {
        .description {
            max-height: 5rem;
        }
    }
}
</style>