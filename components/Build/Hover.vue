<script setup lang="ts" >
defineProps<{
    fileExtensions: string[]
    createdAt: Date
    updatedAt: Date
    title: string
    description: string
    categorys: {
        name: string
        id: string
    }[]
}>()

const categoryX = ref("")
const categoryY = ref("")
const categoryId = ref<string | null>(null)
const popup = ref(false)

let closeTimeout: null | NodeJS.Timeout = null

function closePopup() {
    closeTimeout = setTimeout(() => {
        popup.value = false
    }, 250)
}

function clearCloseTimeout() {
    if(closeTimeout) {
        clearTimeout(closeTimeout)
    }
}

watchEffect(() => {
    console.log(categoryX.value, categoryY.value, categoryId.value)
})
</script>

<template>
<SystemFlex class="hoverCard"
    width="18.75rem"
    direction="column"
    background="dark" 
    padding="normal" 
    gap="small"
    radius="outer"
    shadow="on"
>
    <h2>{{ title }}</h2>
    <span class="grey">
        Created at: <span class="greyThick">{{ useDateFormat(createdAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Last changed: <span class="greyThick">{{ useDateFormat(createdAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Categoryies: 
        <BuildCategoryText v-for="item in categorys" 
            :name="item.name" 
            :id="item.id"
            @popup="(x, y, id) => {
                categoryX = `${x + 272}px`
                categoryY = `${y + 64 + 20}px`
                categoryId = id
                popup = true
            }"

            @close="closePopup"
        />
    </span>
    
    <span class="light-greyThick description">{{ description }}</span>
    <span class="grey">
        Avalible in: <span class="greyThick" v-for="item in fileExtensions">{{ item }}, </span>
    </span>


    <SystemFlex class="buttons"
        justify-content="space-between"
        align-items="flex-end"
        height="2rem"
    >
        <SystemFlex
            gap="small"
        >
            <SystemIcon src="/icons/like.svg" size="medium" ratio="height" />
            <SystemIcon src="/icons/thumpsUp.svg" size="medium" />
            <SystemIcon src="/icons/thumpsUp.svg" size="medium" style="transform: rotate(180deg);" />
            <SystemIcon src="/icons/share.svg" size="medium" ratio="height" />
        </SystemFlex>

        <SystemIcon src="/icons/arrowRight.svg" size="medium" ratio="width"/>
    </SystemFlex>
</SystemFlex>

<TransitonAppear>
    <BuildCategoryPopup v-if="popup"
        class="popup"
        :id="categoryId"
        @mouseenter="clearCloseTimeout"
        @mouseleave="closePopup"
    />
</TransitonAppear>
</template>

<style scoped lang="scss">
.hoverCard {
    min-height: 15.5rem;
    overflow: hidden;

    position: absolute;
    top: 4rem;
    left: 17rem;
    z-index: 100;



    h2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .description {
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .fileExtension {
        background-color: var(--red);
        padding: 0.2rem 0.5rem;
        border-radius: 0.188rem;

        box-shadow: var(--shadow);

        position: absolute;

        left: 0;
        top: 0;
    }

    .buttons {
        img {
            cursor: pointer;
        }
    }

}

.popup {
    position: absolute;
    z-index: 100;

    top: v-bind(categoryY);
    left: v-bind(categoryX);
}
</style>