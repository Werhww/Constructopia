<script setup lang="ts">
import type { SystemFlex } from '#build/components';

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
<SystemFlex class="buildList"
    @mouseenter="categoryScroller = true"
    @mouseleave="categoryScroller = false"
    
    height="6.25rem"
    width="26.875rem"


    gap="small"
>
    <SystemFlex radius="inner" overflow="hidden" width="11.25rem" >
        <img :src="src" :alt="name">
    </SystemFlex>

    <SystemFlex
        direction="column"
        gap="small"
        width="72.5%"
    >
        <span>{{ name }}</span>
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


        <BuildCategoryScroller :categorys="categorys" :animation-on="categoryScroller" />

        <SystemFlex class="greyStuff"
            gap="normal"
        >
            <SystemFlex align-items="center" gap="tiny">
                <SystemIcon src="/icons/blocks.svg" color="grey" size="medium" ratio="height" />
                <span>{{ blocks }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" >
                <SystemIcon src="/icons/views.svg" color="grey" size="small" ratio="height" />
                <span>{{ views }}</span>
            </SystemFlex>
        </SystemFlex>
    </SystemFlex>
</SystemFlex>
</template>

<style scoped lang="scss">
.buildList {
    .greyStuff {
        span {
            color: var(--grey);
        }
    }

    .grey {
        color: var(--grey);
    }
}
</style>