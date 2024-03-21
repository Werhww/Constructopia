<script setup lang="ts">
import type { Category } from "@prisma/client"

defineProps<{
  category: Category
}>()
</script>

<template>
  <QChip
    square
    class="q-pa-sm bg-grey-9 text-grey text-weight-medium cursor-pointer"
    :label="category.title"
  >
    <QTooltip class="q-pa-none" :delay="200" maxWidth="300px">
      <QCard bordered flat style="width: 300px;">
        <QCardSection class="q-pb-none">
          <div class="text-h6 ellipsis">{{ category.title }}</div>
          <div class="q-pl-sm text-subtitle2 text-grey-7 text-weight-bold">
            by @{{ category.createdBy }}
          </div>
          <QSeparator dark spaced="sm" />
        </QCardSection>
        <QCardSection class="q-pt-none">
          <div class="row justify-between text-body2 text-grey-6">
            <div>created at</div>
            <div class="text-weight-bold">
              {{ useDateFormat(category.createdAt, "D MMM YYYY").value }}
            </div>
          </div>
          <div class="q-pt-sm text-body2 text-grey-6 text-weight-medium ellipsis-3-lines">
            {{ category.description }}
          </div>
        </QCardSection>
      </QCard>
    </QTooltip>
  </QChip>
</template>

<style scoped lang="scss"></style>
