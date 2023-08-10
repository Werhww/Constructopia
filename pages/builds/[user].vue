<template>
  <NuxtPage></NuxtPage>

  <div class="filter_order">
    <ComponentDropdownFilter v-on:change="changeFilter" label="Filter:" :items="FilterDropdown" :withDirection="false"/>
    <ComponentDropdownFilter v-on:change="changeOrder" v-on:change-direction="changeDirection" label="Order:" :items="OrderDropdown" :withDirection="true"/>
  </div>
  <div class="Builds">
    <BuildCard
      v-for="data in buildList"
      class="Builds_item"

      :build="data.build"

      :images="data.images"
    />
  </div>
</template>

<script setup lang="ts">
import { BuildDocument, ImageDocument } from '~/utils/useTypes';

const { user } = useRoute().params
definePageMeta({
  title: 'Builds',
})

const fullBuildList = ref<{
  build: BuildDocument
  images: ImageDocument
}[]>([])

const buildList = ref<{
  build: BuildDocument
  images: ImageDocument
}[]>([])

onMounted(async () => {
  const list = await getBuildListByUserId(user as string)
  buildList.value = list
  fullBuildList.value = list
})

const OrderDropdown = [
  {
    label: "views",
    index: 0
  },
  {
    label: "blocks",
    index: 1
  },
  {
    label: "modified",
    index: 2
  },
  {
    label: "created",
    index: 3
  },
]

const FilterDropdown = [
  {
    label: "all",
    index: 0
  },
  {
    label: "easy",
    index: 1
  },
  {
    label: "medium",
    index: 2
  },
  {
    label: "hard",
    index: 3
  },
]

const currentOrder = ref(OrderDropdown[0].label)
const currentDirection = ref("asc")


async function changeFilter(newVal: string) {
  if (newVal === "all") {
    buildList.value = fullBuildList.value
  } else {
    const newBuildFiltered = await getBuildListByFilter(user as string, newVal)
    const newBuildOrder = await updateBuildOrder(currentOrder.value, currentDirection.value, newBuildFiltered)

    buildList.value = newBuildOrder
  }
}

async function changeOrder(newVal: string) {
  currentOrder.value = newVal
  const newBuildOrder = await updateBuildOrder(currentOrder.value, currentDirection.value, buildList.value)
  buildList.value = newBuildOrder
}

function changeDirection(newVal: string) {
  currentDirection.value = newVal
  buildList.value = buildList.value.reverse()
}
</script>

<style scoped>
.filter_order {
  display: flex;
  justify-content: space-between;
}

.Builds {
  display: flex;
  flex-wrap: wrap;
  column-gap: 2.125rem;
  row-gap: 2.375rem;
  justify-content: space-between;

  transition: all 0.3s ease;

}

.Builds_item {
  flex: 1 15rem;
  max-width: 15rem;
}
</style>