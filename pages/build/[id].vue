<script setup lang="ts">
const buildId = Number(useRoute().params.id);
if (isNaN(buildId)) throw createError("Invalid build id");

const data = await serverFunction("findBuild", buildId);
if (isServerError(data)) throw createError("Build not found");

const slide = ref(1);
const fullscreen = ref(false);
</script>

<template>
  <div style="width: 40rem">
    <QCarousel
      swipeable
      animated
      v-model="slide"
      v-model:fullscreen="fullscreen"
      thumbnails
      infinite
      dark
      height="800px"
      control-color="dark"
    >
      <QCarouselSlide
        v-for="(image, i) in data.images"
        :name="i"
        :img-src="image"
      />
      <template v-slot:control>
        <q-carousel-control position="bottom-right" :offset="[18, 18]">
          <QBtn
            push
            round
            dense
            color="dark"
            text-color="primary"
            :icon="fullscreen ? 'sym_r_fullscreen_exit' : 'sym_r_fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </QCarousel>
  </div>
</template>

<style scoped lang="scss"></style>
