<script setup lang="ts">
import type { Interaction } from "@prisma/client"

defineProps<{
  data: Interaction
  replies: Interaction[]
}>()

const repliesOpen = ref(false)

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

    <QCardSection v-if="repliesOpen">
      <QCardSection class="q-pa-none" v-for="reply in replies">
          <QCardSection class="row items-center q-pa-none">
          <QAvatar>
            <QIcon name="sym_r_person" />
          </QAvatar>
          <div class="text-subtitle1">
            {{ reply.username }}
          </div>
        </QCardSection>

        <QCardSection
          v-html="reply.comment"
          class="q-pt-none q-pb-none q-pl-lg"
        ></QCardSection>
        <QSeparator size="2px" inset spaced="sm" />
      </QCardSection>
    </QCardSection>

    <QCardActions class="q-pb-none">
      <div class="col-5 col-auto">
        <QBtn @click="console.log(replies)" round size="sm" icon="sym_r_reply">
          <QTooltip >
            Reply
          </QTooltip>
        </QBtn>
      </div>
      <div class="col-2 column items-center">
        <QBtn @click="repliesOpen = !repliesOpen" :class="{ 'rotate-180': repliesOpen}" round size="sm" icon="sym_r_expand_more" />
      </div>
      <Qspace/>
    </QCardActions>
  </QCard>
</template>

<style scoped lang="scss"></style>
