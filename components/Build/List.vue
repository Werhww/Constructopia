<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

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

const dropdownElement = ref(null)
onClickOutside(dropdownElement, () => {dropdown.value = false; forceOff.value = false})

const categoryScroller = ref(false)
const forceOff = ref(false)

const dropdown = ref(false)
</script>

<template>
<SystemFlex class="buildList"
    @mouseenter="categoryScroller = true"
    @mouseleave="categoryScroller = false"
    
    height="6.25rem"
    width="26.875rem"


    gap="small"
>
    <img :src="src" :alt="name" class="image">

    <SystemFlex
        direction="column"
        gap="small"
        width="14.5rem"
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


        <BuildCategoryScroller :categorys="categorys" :animation-on="categoryScroller && !forceOff" />

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
    <SystemIcon @click="dropdown = !dropdown; forceOff = true" src="/icons/verticalDots.svg" alt="option icons" size="medium" ratio="height" class="dots" />

    <SystemFlex class="dropdown" ref="dropdownElement"  v-if="dropdown"
        direction="column"
        background="dark" 
        padding="small"
        gap="small"
        radius="small"
        shadow="on"

        height="fit-content"
    >
        <SystemFlex
            gap="small"
            align-items="center"
        >
            <SystemIcon src="/icons/like.svg" alt="Like icon" size="medium" />
            <span>Favorite</span>
        </SystemFlex>
        <SystemFlex
            gap="small"
            align-items="center"
        >
            <SystemIcon src="/icons/report.svg" alt="Like icon" size="medium" />
            <span>Report</span>
        </SystemFlex>
    </SystemFlex>
</SystemFlex>
</template>

<style scoped lang="scss">
.buildList {
    position: relative;
    cursor: pointer;
    
    .image {
        max-width: 11.25rem;
        min-width: 11.25rem;
        object-fit: cover;
        border-radius: var(--rad-inner);
    }

    .greyStuff {
        span {
            color: var(--grey);
        }
    }

    .grey {
        color: var(--grey);
    }

    .dots {
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
    }

    &:hover {
        .dots {
            opacity: 1;
        }
    }

    .dropdown {
        position: absolute;
        right: 0;
        top: 1.5rem;
    }
}
</style>