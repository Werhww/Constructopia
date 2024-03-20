<script setup lang="ts">
const loading = ref(true);
const precentage = ref(0);

const eplle = setInterval(() => {
  precentage.value += 10;

  if (precentage.value === 100) {
    clearInterval(eplle);
    loading.value = false;
  }
}, 500);
</script>

<template>
  <div class="row q-gutter-y-xl q-gutter-x-md">
    <Suspense>
      <buildcarditem :id="1" />

      <template #fallback>
        <div class="fit column items-center justify-center">
          <QSpinnerGears
            color="primary"
            size="lg"
            :stroke-width="5"
            :percentage="precentage"
          />
          <div class="text-h6 text-primary text-weight-bold">
            {{ precentage }}%
          </div>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
.test {
  padding: 0rem;
}
</style>
