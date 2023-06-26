<script setup lang="ts">

defineExpose({
  open
})

const emit = defineEmits(['open'])

const isOpen = ref(false)

/* Endre til å hente direkte fra auth */
/* userId skal ikke bruke i prod */
const userId = '123'

function open() {
  isOpen.value = !isOpen.value
  emit('open', isOpen.value)
}
</script>

<template>
<nav class="header-dropdown">
  <img @click="open" src="/icons/Header/user-icon.svg">
  <Transition name="dropdown">
    <nav v-if="isOpen" class="dropdown">
      <HDropdownItem text="Profile" image="/icons/Header/user-icon-dropdown.svg" to="/profile"/>
      <HDropdownItem text="Builds" image="/icons/Header/build-icon.svg" :to="`/builds/${userId}`"/>
      <HDropdownItem text="Favorites" image="/icons/Header/star-icon.svg" to="/profile/favorites"/>
      <HDropdownItem text="New Build" image="/icons/Header/new-document-icon.svg" to="/profile/new-build"/>
      <HDropdownItem text="Logout" image="/icons/Header/logout-icon.svg" to="404" :isLink="true"/>
    </nav>
  </Transition>
</nav>
</template>

<style scoped>
.header-dropdown {
  position: relative;
  z-index: 10;
  filter: drop-shadow(0 10px 4px rgba(0, 0, 0, 0.25));
}

img {
  cursor: pointer;
}

.dropdown {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: .5rem 0.688rem;
  border-radius: 0 0 1rem 1rem;

  gap: .5rem;


  overflow-y: hidden;

  position: absolute;
  top: 3.1rem;
  right: 0;
  background-color: var(--background)
}

.dropdown-enter-active {
  animation: dropdown .5s ease-in;
}
.dropdown-leave-active {
  animation: dropdown .3s reverse ease;
}

@keyframes dropdown {
  0% {
    height: 0;
  }
  100% {
    height: 9rem;
  }
}
</style>