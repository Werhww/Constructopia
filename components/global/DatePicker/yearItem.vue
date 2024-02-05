<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';

const props = defineProps<{
    currentYear: number
    year: number
}>()

const yearItemElm = ref<HTMLElement | null>(null)

const emit = defineEmits({
    changeYear: (year: number, monthIndex: number) => true,
    yearOpen: (offsetTop: number) => true
})

const isOpen = ref(false)

function moveToYear() {
    setTimeout(() => {
        console.log(yearItemElm.value)
        if(!yearItemElm.value) return

        emit('yearOpen', yearItemElm.value.offsetTop - 10)
    }, 100)
}

onMounted(() => {
    if(props.year == props.currentYear) {
        isOpen.value = true
        moveToYear()
    }
})
</script>

<template>
<OnClickOutside @trigger="isOpen = false">
    <div  ref="yearItemElm"></div>
    <SystemFlex class="yearItem"
        direction="column" 
        radius="small"
        overflow="hidden"
    >
        <SystemFlex :class="{ currentYear: currentYear, label: true }"
            width="100%"
            padding="small"
            @click="isOpen = !isOpen; moveToYear()"
        >
            <span>{{ year }}</span>
        </SystemFlex>
        
        <SystemFlex v-if="isOpen"
            wrap="wrap"
            gap="small"
    
        >
            <DatePickerYearItemMonth 
                v-for="monthIndex in 12"
                :year="year"
                :monthIndex="monthIndex"
                @changeMonth="(monthIndex) => $emit('changeYear', year, monthIndex)"
            />
        </SystemFlex>
    </SystemFlex>
</OnClickOutside>
</template>

<style scoped lang="scss">
.yearItem {
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    user-select: none;

    .label {
        &:hover {
            background-color: var(--_connector-color);
        }
    }   

    .currentYear {
        font-weight: 600;
    }
}
</style>