<script setup lang="ts">
const props = defineProps<{
    isRange: boolean
    dayList: {
        day: number;
        date: Date;
        isThisMonth: boolean;
        overflowEnd: boolean;
        overflowStart: boolean;

        start: boolean;
        middle: boolean;
        end: boolean;

        inDateRange: boolean;
    }[]
}>()
defineEmits<{
    dragHold: [date: Date, isThisMonth: boolean]
    dragDrop: [date: Date, isThisMonth: boolean]
    mouseOverDay: [date: Date]
}>()
</script>

<template>
<div class="calendarColumns" :data-is-range="isRange">
    <p class="dayLabel">{{ useDateFormat(getDaysDate("monday"),"dd", { locales: 'en-US' }).value }}</p>
    <p class="dayLabel">{{ useDateFormat(getDaysDate("tuesday"),"dd", { locales: 'en-US' } ).value }}</p>
    <p class="dayLabel">{{ useDateFormat(getDaysDate("wednesday"),"dd", { locales: 'en-US' } ).value }}</p>
    <p class="dayLabel">{{ useDateFormat(getDaysDate("thursday"),"dd", { locales: 'en-US' } ).value }}</p>
    <p class="dayLabel">{{ useDateFormat(getDaysDate("friday"),"dd", { locales: 'en-US' } ).value }}</p>
    <p class="dayLabel">{{ useDateFormat(getDaysDate("saturday"),"dd", { locales: 'en-US' } ).value }}</p>
    <p class="dayLabel">{{ useDateFormat(getDaysDate("sunday"),"dd", { locales: 'en-US' } ).value }}</p>
    <div 
        v-for="item in dayList" 
        :class="{ 
            day: item.isThisMonth, 
            dayLabel: !item.isThisMonth,
            endHover: item.overflowEnd, 
            startHover: item.overflowStart,
            inDateRange: !item.inDateRange
        }"

        @mousedown="$emit('dragHold', item.date, item.isThisMonth)"
        @mouseup="$emit('dragDrop', item.date, item.isThisMonth)" 
        @mouseenter="$emit('mouseOverDay', item.date)" 

        :data-start="item.start" 
        :data-middle="item.middle" 
        :data-end="item.end">
        <p>{{ item.day }}</p>
    </div>
</div>
</template>

<style scoped lang="scss">
.calendarColumns {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(7, 1fr);
    row-gap: 0.2rem;
    width: 100%;
    height: 100%;
    
    p {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 2.125rem;
        font-weight: 700;
    }

    .dayLabel {
        user-select: none;

        color: var(--grey);
        font-weight: 700;

        > p {
            color: var(--grey);
            font-weight: 700;
            border-radius: 1rem;
        }

        &[data-start="true"] {
            & > p {
                background: var(--_dayLabel_connector-color);
            }
        }
    }

    .day {
        user-select: none;
        & > p {
            border-radius: 1rem;
            cursor: pointer;
        }

        transition: all 05ms ease-in-out;

        & > p {
            &:hover {
                background: var(--_connector-color);
            }
        }

        &[data-start="true"] {
            & > p {
                background: var(--grey);
            }
        }
    }

    .endHover {
        cursor: url('/icons/next.svg') 15 0, auto;
    }

    .startHover {
        cursor: url('/icons/previous.svg') -15 0, auto;
    }

    &[data-is-range="true"] {
        .day {
            &[data-start="true"] {
                background: linear-gradient(to right, transparent, var(--_connector-color));

                & > p {
                    background: var(--grey);
                }
            }

            &[data-middle="true"] {
                background: var(--_connector-color);
            }

            &[data-end="true"] {
                background: linear-gradient(to left, transparent, var(--_connector-color));

                & > p {
                    background: var(--grey);
                }
            }
        }

        .dayLabel {
            

            &[data-start="true"] {
                background: linear-gradient(to right, transparent, var(--_dayLabel_connector-color));

                & > p {
                    background: var(--_dayLabel_connector-color);
                }
            }

            &[data-middle="true"] {
                background: var(--_dayLabel_connector-color);
            }

            &[data-end="true"] {
                background: linear-gradient(to left, transparent, var(--_dayLabel_connector-color));

                & > p {
                    background: var(--_dayLabel_connector-color);
                }
            }

        }
    }

    .inDateRange {
        pointer-events: none;
        
        & > p {
            color: var(--grey);
        }
    }
}
</style>