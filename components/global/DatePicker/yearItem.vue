<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';

const props = defineProps<{
    currentYear: number
    year: number
    maxDate?: Date
    minDate?: Date
    alreadyOpen?: boolean
}>()

const yearItemElm = ref<HTMLElement | null>(null)

const monthList = computed(() => {
    if(props.minDate) {
        if(props.year === props.minDate.getFullYear()) {
            let monthList = []

            for(let i = 0; i < 12; i++) {
                if(i >= props.minDate.getMonth()) {
                    monthList.push({ month: i, show: true })
                } else {
                    monthList.push({ month: i, show: false })
                }
            }

            return monthList
        }
    }

    if(props.maxDate) {
        if(props.year === props.maxDate.getFullYear()) {
            let monthList = []

            for(let i = 0; i < 12; i++) {
                if(i <= props.maxDate.getMonth()) {
                    monthList.push({ month: i, show: true })
                } else {
                    monthList.push({ month: i, show: false })
                }
            }

            return monthList
        }
    }

    return Array.from({ length: 12 }, (_, i) => ({ month: i, show: true }))
})

const emit = defineEmits({
    changeYear: (year: number, monthIndex: number) => true,
    yearOpen: (offsetTop: number) => true,
    onLoadSnap: (offsetTop: number) => true
})

const isOpen = ref(false)

function moveToYear() {
    setTimeout(() => {
        if(!yearItemElm.value) return

        emit('yearOpen', yearItemElm.value.offsetTop - 10)
    }, 100)
}

onMounted(() => {
    if(props.year === props.currentYear) {
        if(props.alreadyOpen) return

        isOpen.value = true

        setTimeout(() => {
            if(!yearItemElm.value) return

            emit('onLoadSnap', yearItemElm.value.offsetTop - 10)
        }, 100)
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
                v-for="item in monthList"
                :year="year"
                :monthIndex="item.month"
                :show="item.show"
                @changeMonth="(monthIndex) => {$emit('changeYear', year, monthIndex), console.log('monthIndex', monthIndex)}"
            />
        </SystemFlex>
    </SystemFlex>
</OnClickOutside>
</template>

<style scoped lang="scss">
.yearItem {
    transition: all 0.2s ease-in-out;

    user-select: none;

    .label {
        cursor: pointer;
        &:hover {
            background-color: var(--_connector-color);
        }
    }   

    .currentYear {
        font-weight: 600;
    }
}
</style>