<script setup lang="ts">
const buildId = Number(useRoute().params.id);
if (isNaN(buildId)) throw createError("Invalid build id");

const build = await serverFunction("findBuild", buildId);
if (isServerError(build)) throw createError("Build not found");

</script>

<template>
<div class="q-pt-lg q-pl-xl q-pr-xl">
  <BuildProductpageview :data="build" />
</div>
</template>

<style scoped lang="scss"></style>
