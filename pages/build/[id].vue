<script setup lang="ts">
const buildId = Number(useRoute().params.id);
if (isNaN(buildId)) throw createError("Invalid build id");

const data = await serverFunction("findBuild", buildId);
if (isServerError(data)) throw createError("Build not found");

const slide = ref(0);
</script>

<template>
  <div style="width: 40rem;">
    <QCarousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
      dark
      height="600px"

      control-color="dark"
    >
      <QCarouselSlide
        v-for="(image, i) in data.images"
        :name="i"
        :img-src="image"
      />
    </QCarousel>
  </div>
</template>

<style scoped lang="scss"></style>
