<script setup lang="ts">
const props = defineProps<{
    id: number | null
}>()

if(props.id === null) throw createError("No id provided")

const data = await serverFunction("findCategory", props.id)
if (isServerError(data)) throw createError("Category not found")


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
    <h2>{{ data?.name }}</h2>
    <span class="grey">
        Created by: <span class="greyThick">{{ useDateFormat(data?.createdAt, "MMM D, YYYY").value }}</span>
    </span>
    <span class="grey">
        Made by: <Username class="light-greyThick" :username="data?.user.minecraftName" :user-id="data?.createdBy" />
    </span>
    <span class="light-greyThick description">
        {{ data?.description }}
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