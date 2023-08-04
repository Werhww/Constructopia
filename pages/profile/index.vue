<template>
<section class="User">
  <h1>{{ user.username }}</h1>
  <div class="User-Data">
    <div>
      <h2>Email</h2>
      <ComponentInput v-model="user.email" />
    </div>
    <div>
      <h2>Username</h2>
      <ComponentInput v-model="user.username" />
    </div>
    <div>
      <h2>Minecraft name</h2>
      <ComponentInput v-model="user.minecraft_username" />
    </div>
  </div>
  <div class="change-password">
    <img src="/icons/global/password-icon.svg">
    <p>Change password</p>
  </div>
  <ComponentButton v-on:click="saveChanges" label="Save changes" color="var(--background)" bg_color="var(--white)" class="save-button"/>
</section>

<BuildListProfile
  title="My Builds"
  :builds="usersBuilds"
/>
</template>

<script setup lang="ts">
import {
  BuildDocument,
  ImageDocument,
} from '~/utils/useTypes'

definePageMeta({
  title: 'Profile'
})

/* change with auth */
const USERID = '1234test'

const user = ref({
  username: "Werhw",
  minecraft_username: "Supergutt09",
  email: "leo@gmail.com"
})

const usersBuilds = ref<{
  build: BuildDocument
  images: ImageDocument
}[]>([])

onMounted(async () => {
  const list = await getBuildListByCategory(USERID)
  usersBuilds.value = list
})

function saveChanges() {
  console.log(user.value)
}
</script>

<style scoped>
.User {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  width: min-content;
}


.User > h1{
  font: var(--title);
  color: var(--white);
  font-weight: 600;
}

.User-Data {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 0 1.875rem;
}

.User-Data > div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.User-Data h2 {
  font: var(--text);
  color: var(--white);
  width: 8.75rem;
}

.change-password {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font: var(--metadata);
  color: var(--lower-tone);
  cursor: pointer;

  align-self: center;
}

.save-button {
  align-self: center;
}
</style>