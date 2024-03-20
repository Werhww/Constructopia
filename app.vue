<script setup lang="ts">
const pageName = ref("Home");
const search = ref("");
const searchLoading = ref(false);

watch(search, () => {
  searchLoading.value = true;
  setTimeout(() => {
    searchLoading.value = false;
  }, 1000);
});
</script>

<template>
  <QLayout view="hHh LpR lff">
    <QHeader class="bg-dark" dense elevated>
      <QToolbar class="q-pt-md q-pb-md q-pl-xl q-pr-xl">
        <QToolbarTitle class="text-h3">{{ pageName }}</QToolbarTitle>

        <QBtn round flat dense :debounce="100" size="lg">
          <QIcon name="sym_r_person" size="lg" />

          <QMenu dark auto-close>
            <QList style="min-width: 200px">
              <QItem clickable v-ripple>
                <QItemSection class="text-body1">Profile</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_person" size="sm" />
                </QItemSection>
              </QItem>

              <QItem clickable v-ripple>
                <QItemSection class="text-body1">Builds</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_home_work" size="sm" />
                </QItemSection>
              </QItem>

              <QItem clickable>
                <QItemSection class="text-body1">Favorite</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_star" size="sm" />
                </QItemSection>
              </QItem>

              <QItem clickable>
                <QItemSection class="text-body1">New build</QItemSection>
                <QItemSection avatar>
                  <QIcon name="sym_r_note_add" size="sm" />
                </QItemSection>
              </QItem>

              <QSeparator dark />
              <QSeparator dark />

              <QItem clickable dense>
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

    <QDrawer
      class="bg-dark"
      no-swipe-close
      show-if-above
      persistent
      side="left"
      elevated
    >
      <!-- drawer content -->
    </QDrawer>

    <QPageContainer>
      <NuxtPage />
    </QPageContainer>
  </QLayout>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

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
  overflow-x: hidden;
}

* {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif;
  box-sizing: border-box;
}
</style>
