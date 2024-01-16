<script setup lang="ts">
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

    categorys: string[]
}>()
</script>

<template>
<SystemFlex 
    direction="column"
    gap="small"
    padding="normal" 
    background="dark" 
    radius="outer"

    width="16.375rem"
>
    <img :src="src" :alt="name">
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
    <SystemFlex></SystemFlex>
</SystemFlex>
</template>

<style scoped lang="scss">
.buildTitle {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.tinyStuff {
    span {
        color: var(--grey);
    }
}
</style>