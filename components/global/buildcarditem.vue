<script setup lang="ts">
const props = defineProps<{
  id: number
}>()

const data = await serverFunction("findBuild", props.id)
if (isServerError(data)) throw createError("Build not found")
</script>

<template>
  <QCard flat dark bordered class="cursor-pointer">
    <QImg
      :src="data.images[0]"
      height="200px"
      width="250px"
      @click="$router.push(`build/${data.id}`)"
    >
      <div class="absolute-bottom text-subtitle2 ellipsis">
        {{ data.title }}
      </div>
    </QImg>

    <QTooltip
      :delay="200"
      anchor="center end"
      self="top left"
      class="q-pa-none"
      maxWidth="400px"
    >
      <QCard flat bordered>
        <QCardSection class="q-pb-none">
          <div class="text-h6 ellipsis-2-lines">{{ data.title }}</div>
          <div class="q-pl-sm text-subtitle2 text-grey-7 text-weight-bold">
            by @{{ data.username }}
          </div>
          <QSeparator dark spaced="sm" />
        </QCardSection>

        <QCardSection horizontal class="row q-pb-sm q-pt-sm">
          <QCardSection
            class="q-pa-none column col items-center text-body2 text-grey-6"
          >
            <div>Blocks</div>

            <div class="text-weight-bold">{{ data.blockCount }}</div>
          </QCardSection>
          <QSeparator vertical dark />
          <QCardSection
            class="q-pa-none column col items-center text-body2 text-grey-6"
          >
            <div>Difficulty</div>

            <div class="text-weight-bold">{{ data.difficulty }}</div>
          </QCardSection>
          <QSeparator vertical dark />
          <QCardSection
            class="q-pa-none column col items-center text-body2 text-grey-6"
          >
            <div>Size</div>

            <div class="text-weight-bold">{{ data.size }}</div>
          </QCardSection>
        </QCardSection>

        <QCardSection class="q-pt-none q-pb-xs">
          <div class="row no-wrap justify-between text-body2 text-grey-6">
            <div>Created at</div>
            <div class="text-weight-bold">
              {{ useDateFormat(data.createdAt, "D MMM YYYY").value }}
            </div>
          </div>
          <div class="row no-wrap justify-between text-body2 text-grey-6">
            <div>Last change</div>
            <div class="text-weight-bold">
              {{ useDateFormat(data.updateAt, "D MMM YYYY").value }}
            </div>
          </div>
          <div class="row no-wrap justify-between text-body2 text-grey-6">
            <div>Download</div>
            <div class="text-weight-bold">{{ data.downloads }}</div>
          </div>
          <div class="row no-wrap justify-between text-body2 text-grey-6">
            <div>Views</div>
            <div class="text-weight-bold">{{ data.views }}</div>
          </div>
        </QCardSection>

        <QCardSection class="q-pt-none q-pb-xs text-grey-8 text-body2">
          <div class="ellipsis-3-lines">
            {{ data.description }}
          </div>
        </QCardSection>

        <QCardSection
          class="q-pt-sm q-pb-md row items-center q-gutter-xs text-body2 text-grey-6"
        >
          <Categorychip
            v-for="category in data.categorys"
            :category="category"
          />
        </QCardSection>
      </QCard>
    </QTooltip>
  </QCard>
</template>
