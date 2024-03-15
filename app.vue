<script setup lang="ts">
const pageName = ref("Home");
const search = ref("");
</script>

<template>
  <QLayout view="hHh lpr fFf">
    <QHeader reveal class="bg-dark">
      <QToolbar class="q-pt-md q-pb-md">
        <QToolbarTitle class="text-h3">{{ pageName }}</QToolbarTitle>

        <QInput
          dark
          dense
          standout
          v-model="search"
          input-class="text-right"
          class="col-3"
        >
          <template v-slot:append>
            <QIcon v-if="search === ''" name="sym_r_search" />
            <QIcon
              v-else
              name="sym_r_clear"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </QInput>

        <QBtn round flat dense :debounce="100" size="lg">
          <QIcon name="sym_r_person" size="lg" />

          <QMenu dark>
            <QList style="min-width: 200px">
              <QItem clickable v-ripple>
                <QItemSection class="text-body1">Profile</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_person" size="sm" />
                </QItemSection>
              </QItem>

              <QSeparator dark />

              <QItem clickable v-ripple>
                <QItemSection class="text-body1">Builds</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_home_work" size="sm" />
                </QItemSection>
              </QItem>

              <QSeparator dark />

              <QItem clickable v-ripple>
                <QItemSection class="text-body1">Favorite</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_star" size="sm" />
                </QItemSection>
              </QItem>

              <QSeparator dark />

              <QItem clickable v-ripple>
                <QItemSection class="text-body1">New build</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_note_add" size="sm" />
                </QItemSection>
              </QItem>

              <QSeparator dark />
              <QSeparator dark />

              <QItem clickable v-ripple dense>
                <QItemSection>Logout</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_logout" size="sm" />
                </QItemSection>
              </QItem>
            </QList>
          </QMenu>
        </QBtn>
      </QToolbar>
    </QHeader>

    <q-page-container>
      <NuxtPage />
    </q-page-container>

    <QFooter class="bg-dark">
      <QToolbar>
        <QSpace />
        <QToolbarTitle class="text-h6">© 2021</QToolbarTitle>
      </QToolbar>
    </QFooter>
  </QLayout>
</template>

<style lang="scss">
/* Colors */
$primary: #ec8489;
$secondary: #921818;
$accent: #ef3a3a;

$dark: #1f1f1f;

$positive: #25e61e;
$negative: #ef3a3a;
$info: #1826f3;
$warning: #ffc400;

body {
  background-color: $dark;
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
}

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

:root {
  --pad-normal: 1rem;
  --pad-small: 0.5rem;

  --rad-outer: 1rem;
  --rad-inner: 0.5rem;
  --rad-small: 0.375rem;

  --gap-big: 2.5rem;
  --gap-normal: 1rem;
  --gap-small: 0.375rem;
  --gap-tiny: 0.25rem;
}

h1 {
  font-size: 3rem;
  font-weight: 500;
}

h2 {
  font-size: 1.25rem;
  font-weight: 500;
}

p {
  font-size: 1rem;
  font-weight: 500;
}

span {
  font-size: 0.8rem;
  font-weight: 500;
}

.grey {
  color: var(--grey);
  font-weight: 400;
}

.greyThick {
  color: var(--grey);
  font-weight: 600;
}

.light-grey {
  color: var(--light-grey);
  font-weight: 400;
}

.light-greyThick {
  color: var(--light-grey);
  font-weight: 600;
}
</style>
