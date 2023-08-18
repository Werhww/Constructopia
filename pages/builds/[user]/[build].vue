<template>
  <Suspense>
    <BuildOpen
      v-on:share="share"
      v-on:3d-editor="open3dEditor"
      :build-id="build"
    />

    <template #fallback>
      <BuildLoading/>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
definePageMeta({
  title: "Build",
});

const { build } =  useRoute().params;

function share() {
  console.log("share");
}

function open3dEditor() {
  console.log("open 3d editor");
}
</script>