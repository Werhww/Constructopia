<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';

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

const openFilterCreator = ref(false)
const filterSelectValue = ref()

const filters = ref<{
    item: string, 
    operator: string, 
    value: string | number | Date[]
}[]>([])

</script>

<template>
<div class="filter">
    <OnClickOutside @trigger="menuOpen = false">
        <SystemFlex
            align-items="flex-end"
            gap="tiny"
        >
            <SystemButton icon="/icons/filter.svg" :click="() => {menuOpen = !menuOpen, openFilterCreator = false}" />
            <FilterCreatedFilter v-for="(item, index) in filters" :index="index" :item="item.item" :value="item.value" :operator="item.operator" />
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
                <FilterDropdown title="Filter:" v-model="filterSelectValue" :options="OrderItemsFullList" @update:model-value="openFilterCreator = true; menuOpen = false" />
                <FilterDropdown title="Order:" v-model="orderSelectValue" :show-choosen="true" :exclude-choose="true" :options="OrderItemsFullList" />
            </SystemFlex>
        </Transition>
    </OnClickOutside>
        
    <Transition name="apper">
        <OnClickOutside  v-if="openFilterCreator" @trigger="openFilterCreator = false, filterSelectValue = ''">
            <FilterCreateFilter @create-filter="(item, operator, value) => {filters.push({item, operator, value}), openFilterCreator = false}" :chosen-filter-item="filterSelectValue" class="dropdownPosition"/>
        </OnClickOutside>
    </Transition>

</div>
</template>

<style scoped lang="scss">
.filter {
    user-select: none;
    position: relative;

    width: fit-content;
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