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
  <div class="row">
    <!-- <QBtn color="primary" icon="sym_r_toggle_on" label="primary" />
    <QBtn color="secondary" icon="sym_r_toggle_on" label="secondary"   />
    <QBtn color="accent" icon="sym_r_toggle_on" label="accent" />
    <QBtn color="positive" text-color="dark" icon="sym_r_toggle_on" label="positive" />
    <QBtn color="negative" icon="sym_r_toggle_on" label="negative" />
    <QBtn color="info" icon="sym_r_toggle_on" label="info" />
    <QBtn color="warning" text-color="dark" icon="sym_r_toggle_on" label="warning"  /> -->

    <Suspense>
        <BuildCard
            :id="1"  
        />

        <template #fallback>
            <div>Loading...</div>   
        </template>
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
.test {
  padding:  0rem;
}
</style>
