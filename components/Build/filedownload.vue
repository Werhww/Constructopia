<script setup lang="ts">
import type { BuildFiles } from "@prisma/client"

defineProps<{
  buildFile: BuildFiles
}>()

const downloadAnchor = ref<HTMLAnchorElement | null>(null)

const disabled = ref(false)

function download() {
  if (downloadAnchor.value) {
    downloadAnchor.value.click()
    disabled.value = true
    setTimeout(() => {
    disabled.value = false
  }, 3000)
  }
}
</script>

<template>
  <QItem
    v-ripple
    clickable
    :href="buildFile.file"
    :disable="disabled"
    @click="download"
  > 
    <a ref="downloadAnchor" :href="buildFile.file" taget="_blank" download hidden></a>
    <QItemSection>
      <QItemLabel>{{ buildFile.format }}</QItemLabel>
    </QItemSection>
    <QItemSection avatar>
      <QIcon v-if="!disabled" name="sym_r_download" />
      <QSpinnerIos v-else color="secondary" size="2em" />
    </QItemSection>
  </QItem>
</template>

<style scoped lang="scss"></style>
