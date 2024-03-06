<script setup lang="ts">
const props = defineProps<{
    id: number | null
}>()

const info = ref({
    name: "test",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus ab nesciunt alias, excepturi qui officiis inventore. Molestiae dolore totam doloremque? Fuga provident eum dolorum reprehenderit praesentium veniam architecto, omnis quis!",
    createdAt: new Date(),
    createdBy: "eokemos",
    creatorId: 132
})
</script>

<template>
<SystemFlex class="popup"
    direction="column"
    gap="small"
    padding="normal"
    background="dark"
    radius="outer"
    shadow="on"
    width="18.75rem"
>
    <h2>{{ info.name }}</h2>
    <span class="grey">
        Created by: <span class="greyThick">{{ useDateFormat(info.createdAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Made by: <BuildUsername class="light-greyThick" :username="info.createdBy" :user-id="info.creatorId" />
    </span>
    <span class="light-greyThick description">
        {{ info.description }}
    </span>
    <SystemFlex
        width="100%"
        justify-content="flex-end"
    >
        <SystemIcon src="/icons/arrowRight.svg" size="medium" ratio="width"/>
    </SystemFlex>
</SystemFlex>
</template>

<style scoped lang="scss">

.popup {
    img {
        cursor: pointer;
    }
}
.description {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>