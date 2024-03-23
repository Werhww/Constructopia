<script setup lang="ts">
import type { Interaction } from "@prisma/client"

defineProps<{
  data: Interaction
  allReplys: Interaction[]
}>()

</script>

<template>
  <QCard>
    <QCardSection class="row items-center q-pa-none">
      <QAvatar>
        <QIcon name="sym_r_person" />
      </QAvatar>
      <div class="text-subtitle1">
        {{ data.username }}
      </div>
    </QCardSection>

    <QCardSection
      v-html="data.comment"
      class="q-pt-none q-pb-none q-pl-lg"
    ></QCardSection>
    <QCardActions>
      <QBtn @click="console.log(allReplys)" round size="sm" icon="sym_r_reply" />
      <QBtn round size="sm" icon="sym_r_reply" />
    </QCardActions>
  </QCard>
</template>

<style scoped lang="scss"></style>
