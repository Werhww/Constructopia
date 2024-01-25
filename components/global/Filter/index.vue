<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

interface FilterDropdownItemProps {
    src: string
    label: string
    size: "tiny" | "small" | "medium"
    ratio: "equal" | "width" | "height"
}

const menuOpen = ref(false)

const filterOpen = ref(false)
const orderOpen = ref(false)

const currentOrderLabel = ref("Blocks")
const currentOrderItem = computed(() => {
    return OrderItemsFullList.find(item => item.label === currentOrderLabel.value)
})


const orderList = computed(() => {
    return OrderItemsFullList.filter(item => item.label !== currentOrderLabel.value)
})

const OrderItemsFullList = [
    {
        src: "/icons/blocks.svg",
        label: "Blocks",
        size: "medium",
        ratio: "height"
    },
    {
        src: "/icons/views.svg",
        label: "Views",
        size: "medium",
        ratio: "width"
    },
    {
        src: "/icons/size.svg",
        label: "Size",
        size: "medium",
        ratio: "height"
    },
    {
        src: "/icons/editCalendar.svg",
        label: "Created",
        size: "medium",
        ratio: "equal"
    }
] as FilterDropdownItemProps[]

const filterOptionsList = [
    {
        value: "blockCount",
        label: "Blocks"
    },
    {
        value: "updatedAt",
        label: "Last edit"
    },
    {
        value: "Blocks",
        label: "Views"
    },
    {
        value: "Blocks",
        label: "Views"
    },
    {
        value: "Blocks",
        label: "blocks"
    },
    ]
</script>

<template>
<div class="filter">
    <SystemFlex >
        <SystemButton icon="/icons/filter.svg" :click="() => menuOpen = !menuOpen" />
    </SystemFlex>

    <Transition name="apper" >
        <SystemFlex class="filterDropdown" v-show="menuOpen"
            direction="column"
            gap="normal"
            width="14rem"
    
            radius="small"
            padding="normal"
            background="dark"
            shadow="on"
        >
            <SystemFlex
                width="100%"
                direction="column"
            >
                <SystemFlex class="pointer"
                    width="100%"
                    align-items="center"
                    justify-content="space-between"
                    @click="filterOpen = !filterOpen; orderOpen = false"
                >
                    <p>Filter:</p>
                    <SystemIcon class="expand" :data-open="filterOpen" src="/icons/expand.svg" size="tiny" ratio="width" />
                </SystemFlex>
                <Transition
                    name="expand"
                    mode="out-in"
                >
                    <SystemFlex
                        gap="small"
                        padding="small"
                        direction="column"
                        height="8.75rem"
                        overflow="hidden"
                        v-show="filterOpen"
                    >
                        <FilterDropdownItem src="/icons/blocks.svg" label="Blocks" size="medium" ratio="height"  />
                        <FilterDropdownItem src="/icons/editPen.svg" label="Last edit" size="medium" ratio="equal"  />
                        <FilterDropdownItem src="/icons/views.svg" label="Views" size="medium" ratio="width"  />
                        <FilterDropdownItem src="/icons/size.svg" label="Size" size="medium" ratio="height" />
                        <FilterDropdownItem src="/icons/editCalendar.svg" label="Created" size="medium" ratio="equal" />
                    </SystemFlex>
                </Transition>
            </SystemFlex>
            <!-------------------------->
            <SystemFlex
                width="100%"
                direction="column"
            >
                <SystemFlex class="pointer"
                    width="100%"
                    align-items="center"
                    justify-content="space-between"
                    @click="orderOpen = !orderOpen; filterOpen = false"
                >
                    <p>Order:</p>
                    <SystemFlex 
                        gap="small"
                        align-items="center"
                    >
                        <SystemIcon :src="currentOrderItem?.src" :alt="currentOrderItem?.label" :size="currentOrderItem?.size || 'medium'" :ratio="currentOrderItem?.ratio" />
                        <p>{{ currentOrderLabel }}</p>
                    </SystemFlex>        
                    <SystemIcon class="expand" :data-open="orderOpen" src="/icons/expand.svg" size="tiny" ratio="width" />
                </SystemFlex>
                <Transition
                    name="expand"
                    mode="out-in"
                >
                    <SystemFlex v-show="orderOpen"
                        gap="small"
                        padding="small"
                        direction="column"
                        overflow="hidden"
                        height="5.5rem"
                        
                    >
                        <FilterDropdownItem v-for="item in orderList" @click="currentOrderLabel = item.label; orderOpen = false; " :src="item.src" :label="item.label" :size="item.size " :ratio="item.ratio"  />
                    </SystemFlex>
                </Transition>
            </SystemFlex>
        </SystemFlex>
    </Transition>

    <SystemFlex class="createFilter"
        background="background"
        radius="small"
        shadow="on"
    >
        <SystemSelect />
    </SystemFlex>
</div>
</template>

<style scoped lang="scss">
.filter {
    user-select: none;
    position: relative;
    .filterDropdown {
        position: absolute;
        top: 3rem;
    }

    .pointer {
        cursor: pointer;
    }

    .expand {
        transition: all 0.5s ease;
        rotate: -90deg;

        &[data-open="true"] {
            rotate: 0deg;
        }
    }

    .createFilter {
        position: absolute;
        top: 3rem;
    }
}

/* Dropdown apper animations */
.apper-enter-active,
.apper-leave-active {
  transition: opacity 0.1s ease;
}

.apper-enter-from,
.apper-leave-to {
    opacity: 0;
}

/* Dropdown menus animation */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s ease;
}

.expand-enter-from,
.expand-leave-to {
    height: 0;
    padding-top: 0;
    padding-bottom: 0;
}
</style>