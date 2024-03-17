<script setup lang="ts">
const props = defineProps<{
  id: number;
}>();

const data = await serverFunction("findBuild", props.id)
if (isServerError(data)) throw createError("Build not found")
</script>

<template>
  <QCard flat dark bordered class="cursor-pointer">
    <QImg :src="data.images[0]" height="200px" width="250px">
      <div class="absolute-bottom text-subtitle2 ellipsis">
        {{ data.title }}
      </div>
    </QImg>

    <QTooltip
      :delay="200"
      anchor="center end"
      self="top left"
      class="q-pa-none"

      maxWidth="350px"
    >
      <QCard flat dark bordered>
        <QCardSection class="q-pb-none">
          <div class="text-h6 ellipsis-2-lines">{{ data.title }}</div>
          <div class="text-subtitle2 text-grey-7 text-weight-bold">
            by {{ data.username }}
          </div>
          <QSeparator dark spaced="sm" />
        </QCardSection>
        <QCardSection class="q-pt-none q-pb-none q-pl-md row items-center q-gutter-sm">
          <QChip dark dense ripple icon="sym_r_download" class="q-pa-none text-grey-7 text-subtitle1 text-weight-medium" >
            {{ data.downloads }}
          </QChip>
          <QChip dark dense ripple icon="sym_r_visibility" class="q-pa-none text-grey-7 text-subtitle1 text-weight-medium" >
            {{ data.views }}
          </QChip>
          <QChip dark dense ripple icon="sym_s_deployed_code" class="q-pa-none text-grey-7 text-subtitle1 text-weight-medium" >
            {{ data.blockCount }}
          </QChip>
          <QChip dark dense ripple icon="sym_r_height" class="q-pa-none text-grey-7 text-subtitle1 text-weight-medium" >
            {{ data.size }}
          </QChip>
          <span class="text-grey-7 text-subtitle1 text-weight-medium">
            /{{ data.difficulty }}
          </span>
        </QCardSection>

        <QCardSection class="q-pt-none q-pb-xs">
          <div class="text-body2 text-grey-6">
            Created at
            <span class="text-weight-bold">{{
              useDateFormat(data.createdAt, "MMM D, YYYY").value
            }}</span>
          </div>
          <div class="text-body2 text-grey-6">
            Last changed at
            <span class="text-weight-bold">{{
              useDateFormat(data.updateAt, "MMM D, YYYY").value
            }}</span>
          </div>
          <div class="row q-gutter-xs text-body2 text-grey-6">
            <div>Categorys:</div>
            <div class="row" v-for="(category, i) in data.categorys">
              <div class="text-weight-bold">{{ category.title }}</div>
              <div v-if="i != (data.categorys.length - 1)">,</div>
            </div>
          </div>
        </QCardSection>
        <QCardSection class="q-pt-none text-grey-8 text-body2">
          <div class="descriptionEllipsis">
            {{ data.description }}
          </div>
        </QCardSection>
      </QCard>
    </QTooltip>
  </QCard>
</template>

<style scoped lang="scss">
.descriptionEllipsis {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
