<template>
<div class="filter_order">
  <ComponentDropdownFilter v-on:change="changeFilter" label="Filter:" :items="FilterDropdown" :withDirection="false"/>
  <ComponentDropdownFilter v-on:change="changeOrder" v-on:change-direction="changeDirection" label="Order:" :items="OrderDropdown" :withDirection="true"/>
</div>
<div class="Builds">
  <BuildCard
    v-for="i in 20"
    class="Builds_item"

    buildId="1"
    image="https://i.pinimg.com/736x/f5/c0/a2/f5c0a23a575e40913a2056441a30412b.jpg"
    title="House of the future"
    date="2023-05-18T15:00:00"
    user="John-Doe"
    difficulty="easy"
    blocks="5"
    views="100"
    :liked="false"
  />
</div>
</template>

<script setup lang="ts">
const { id } = useRoute().params
definePageMeta({
  title: 'Builds'
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


function changeFilter(newVal: string) {
  console.log(newVal)
}

function changeOrder(newVal: string) {
  console.log(newVal)
}

function changeDirection(newVal: string) {
  console.log(newVal)
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