<template>
  <NuxtPage></NuxtPage>

  <div class="filter_order">
    <ComponentDropdownFilter v-on:change="changeDifficulty" label="Filter:" :items="FilterDropdown" :withDirection="false"/>
    <ComponentDropdownFilter v-on:change="changeOrder" v-on:change-direction="changeDirection" label="Order:" :items="OrderDropdown" :withDirection="true"/>
  </div>
  <div class="Builds">
    <BuildCard
      v-for="{build, images} in buildList"
      class="Builds_item"

      :build="build"

      :images="images"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Builds',
})
import { User } from '~/models/builds'
import { DifficultyKeys, OrderKeys } from "~/utils/useTypes"
const { user } = useRoute().params

const CurrentUser = new User(user as string)

const buildList = ref(await CurrentUser.getBuilds())

const OrderDropdown = ['views', 'blocks', 'modified', 'created']

const FilterDropdown = ['all', 'easy', 'medium', 'hard', 'expert', 'nightmare']

const currentOrder = ref(OrderDropdown[0])
const currentDirection = ref("asc")

function changeDifficulty(newDifficulty: DifficultyKeys) {
  buildList.value = CurrentUser.filterByDifficulty(newDifficulty)
}

function changeOrder(newOrder: OrderKeys) {
  buildList.value = CurrentUser.changeListOrder(newOrder, currentDirection.value)
}

function changeDirection(newDirection: string) {
  currentDirection.value = newDirection
  buildList.value = CurrentUser.reverseBuildList()
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