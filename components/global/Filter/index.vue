<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'


</script>

<template>
<div class="filter">
    <SystemFlex >
        <SystemButton icon="/icons/filter.svg" />

    </SystemFlex>

    <SystemFlex class="filterDropdown"
        direction="column"
        gap="normal"
        width="10rem"

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
            >
                <p>Filter:</p>
                <SystemIcon class="expand" src="/icons/expand.svg" size="tiny" ratio="width" />
            </SystemFlex>
            <SystemFlex
                gap="small"
                padding="small"
                direction="column"
            >
                <FilterDropdownItem src="/icons/blocks.svg" label="Blocks" size="medium" ratio="height"  />
                <FilterDropdownItem src="/icons/editPen.svg" label="Last edit" size="medium" ratio="equal"  />
                <FilterDropdownItem src="/icons/views.svg" label="Views" size="medium" ratio="width"  />
                <FilterDropdownItem src="/icons/size.svg" label="Size" size="medium" ratio="height" />
                <FilterDropdownItem src="/icons/editCalendar.svg" label="Created" size="medium" ratio="equal" />
            </SystemFlex>
        </SystemFlex>
        <!-------------------------->
        <SystemFlex>
            <SystemFlex></SystemFlex>
            <SystemFlex></SystemFlex>

        </SystemFlex>
    </SystemFlex>
</div>
</template>

<style scoped lang="scss">
.filter {
    position: relative;
    .filterDropdown {
        position: absolute;
        top: 3rem;

    }

    .pointer {
        cursor: pointer;
    }

    .expand {
        transition: all 0.3s ease-in-out;
        rotate: -90deg;

        .open {
            rotate: 0deg;
        }
    }
}


</style>