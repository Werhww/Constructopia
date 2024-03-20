<script setup lang="ts">
defineProps<{
  data: NoServerFunctionErrors<ServerFunctionResult<"findBuild">>;
}>();

const slide = ref(0);

const caruselHeight = createReactiveComputed("30rem", "25rem", "15rem");

</script>

<template>
  <div class="row">
    <main class="col-12 col-md-10 column q-gutter-y-md">
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
    <aside
      class="col  gt-md"
    >
    eple
  </aside>
  </div>
</template>

<style scoped lang="scss"></style>
