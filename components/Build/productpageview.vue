<script setup lang="ts">
const props = defineProps<{
  data: NoServerFunctionErrors<ServerFunctionResult<"findBuild">>
  comments: NoServerFunctionErrors<ServerFunctionResult<"getBuildComments">>
}>()

const buildFiles = await serverFunction("getBuildFiles", props.data.id)
if (isServerError(buildFiles)) throw createError("Failed to get build files")

const globalRating = await serverFunction("getBuildRating", props.data.id)
if (isServerError(globalRating)) throw createError("Failed to get build rating")

const slide = ref(0)
const rating = ref(globalRating.rating)

const caruselHeight = createReactiveComputed("30rem", "25rem", "15rem")
</script>

<template>
  <div class="row justify-between">
    <main class="col-12 col-md-8 column">
      <QCarousel
        swipeable
        animated
        v-model="slide"
        thumbnails
        infinite
        :height="caruselHeight"
        control-color="dark"
        class="rounded-borders overflow-hidden"
      >
        <QCarouselSlide
          v-for="(image, i) in data.images"
          :name="i"
          :img-src="image"
        />
      </QCarousel>
      <h1 class="text-h2">{{ data.title }}</h1>
    </main>
    <QCard
      bordered
      flat
      style="height: fit-content"
      class="column col-3 gt-md"
      tag="aside"
    >
      <QCardSection horizontal class="row q-pt-md text-grey-6 text-body2">
        <QCardSection class="q-pa-none column col items-center">
          <div>Blocks</div>

          <div class="text-weight-bold">{{ data.blockCount }}</div>
        </QCardSection>
        <QSeparator vertical dark />
        <QCardSection class="q-pa-none column col items-center">
          <div>Difficulty</div>

          <div class="text-weight-bold">{{ data.difficulty }}</div>
        </QCardSection>
        <QSeparator vertical dark />
        <QCardSection class="q-pa-none column col items-center">
          <div>Size</div>

          <div class="text-weight-bold">{{ data.size }}</div>
        </QCardSection>
      </QCardSection>
      <QCardSection class="q-pt-sm q-pb-md text-grey-6">
        <div class="text-h6 row items-center">
          <div>by</div>
          <QChip
            :label="'@' + data.username"
            square
            class="q-pa-sm bg-grey-9 text-grey text-weight-medium text-subtitle1 cursor-pointer"
          />
        </div>
        <QSeparator dark spaced="0" />
        <QSeparator dark spaced="0" />

        <div class="column q-pt-sm">
          <div class="row justify-between">
            <h6 class="text-weight-thin">Created at</h6>
            <h6 class="text-weight-bold">
              {{ useDateFormat(data.createdAt, "D MMMM YYYY").value }}
            </h6>
          </div>

          <div class="row justify-between">
            <h6 class="text-weight-thin">Last change</h6>
            <h6 class="text-weight-bold">
              {{ useDateFormat(data.updateAt, "D MMMM YYYY").value }}
            </h6>
          </div>

          <div class="row justify-between">
            <h6 class="text-weight-thin">Downloads</h6>
            <h6 class="text-weight-bold">{{ data.downloads }}</h6>
          </div>

          <div class="row justify-between">
            <h6 class="text-weight-thin">Views</h6>
            <h6 class="text-weight-bold">{{ data.views }}</h6>
          </div>
        </div>

        <div
          class="row items-center q-gutter-xs text-body2 text-grey-6 q-pt-sm"
        >
          <Categorychip
            v-for="category in data.categorys"
            :category="category"
          />
        </div>
      </QCardSection>

      <QCardSection class="row">
        <QRating
          v-model="rating"
          max="5"
          size="3em"
          icon="r_star_border"
          icon-selected="r_star"
          icon-half="r_star_half"
          readonly
        />
        <NuxtLink
          class="self-end text-grey-8 text-weight-bold text cursor-pointer"
          style="text-decoration-thickness: 2px; text-underline-offset: 2px"
          href="#comments"
        >
          {{ comments.length }} comments
        </NuxtLink>
      </QCardSection>

      <QCardActions class="full-width">
        <QBtnDropdown
          class="full-width"
          icon="sym_r_download"
          label="Download"
          unelevated
          size="lg"
          color="secondary"
        >
          <QList>
            <BuildFiledownload v-for="file in buildFiles" :buildFile="file" />
          </QList>
        </QBtnDropdown>
      </QCardActions>
    </QCard>
  </div>
</template>

<style scoped lang="scss"></style>
