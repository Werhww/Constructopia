<script setup lang="ts">
const buildId = Number(useRoute().params.id);
if (isNaN(buildId)) throw createError("Invalid build id");

const build = await serverFunction("findBuild", buildId);
if (isServerError(build)) throw createError("Build not found");
const padding = getReactiveSidePadding()
</script>

<template>
<div :class="`${padding} full-width q-pt-lg`">
  <BuildProductpageview :data="build" />
</div>
</template>

<style scoped lang="scss"></style>
