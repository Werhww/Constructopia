<script setup lang="ts">
interface FilterDropdownItemProps {
    src: string
    label: string
    value: string
    size: "tiny" | "small" | "medium"
    ratio: "equal" | "width" | "height"
}

const menuOpen = ref(false)

const OrderItemsFullList = [
    {
        value: "blockCount",
        src: "/icons/blocks.svg",
        label: "Blocks",
        size: "medium",
        ratio: "height"
    },
    {
        value: "views",
        src: "/icons/views.svg",
        label: "Views",
        size: "medium",
        ratio: "width"
    },
    {
        value: "size",
        src: "/icons/size.svg",
        label: "Size",
        size: "medium",
        ratio: "height"
    },
    {   
        value: "createdAt",
        src: "/icons/editCalendar.svg",
        label: "Created",
        size: "medium",
        ratio: "equal"
    }
] as FilterDropdownItemProps[]

const orderSelectValue = ref("blockCount")

const openFilterCreator = ref(true)

</script>

<template>
<div class="filter">
    <SystemFlex >
        <SystemButton icon="/icons/filter.svg" :click="() => menuOpen = !menuOpen" />
    </SystemFlex>

    <Transition name="apper" >
        <SystemFlex class="dropdownPosition" v-if="menuOpen"
            ref="filterDropdown"

            direction="column"
            gap="normal"
            width="14rem"
    
            radius="small"
            padding="normal"
            background="dark"
            shadow="on"
        >
            <FilterDropdown title="Filter:" :options="OrderItemsFullList" />
            <FilterDropdown title="Order:" v-model="orderSelectValue" :show-choosen="true" :exclude-choose="true" :options="OrderItemsFullList" />
        </SystemFlex>
    </Transition>

    <FilterCreateFilter v-if="openFilterCreator" @create-filter="console.log" chosen-filter-item="blockCount" class="dropdownPosition"/>
</div>
</template>

<style scoped lang="scss">
.filter {
    user-select: none;
    position: relative;
    .dropdownPosition {
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
</style>