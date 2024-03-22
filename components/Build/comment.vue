<script setup lang="ts">
import type { Interaction } from '@prisma/client';

defineProps<{
  data: Interaction
}>()
</script>

<template>
<QCard>
  <QCardSection>
    <QAvatar>
      <QIcon name="sym_r_person" />
    </QAvatar>
  </QCardSection>

  <QCardSection v-html="data.comment" ></QCardSection>

</QCard>
</template>

<style scoped lang="scss">

</style>