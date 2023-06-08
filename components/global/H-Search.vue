<script setup lang="ts">
import { ref } from 'vue';

/* Animation propertyes */
const isAni = ref(false)
const imgChangeSpeed = ref(1)
const aniActive = ref(false)

/* search input ref */
const input = ref<HTMLInputElement | null>(null)

/* search input value */
const inputValue = ref('')

function openInput() {
  if (inputValue.value === '') {
    if (!aniActive.value) {
      aniActive.value = true
      isAni.value = !isAni.value
      isAni.value ? imgChangeSpeed.value = 1 : imgChangeSpeed.value = 0.3
      inputValue.value = ''
    }
  } else {
    search()
  }
}

function focusOut() {
  if (inputValue.value === '') {
    openInput()
  }
}

function InputFocus() {
  input.value?.focus()
  aniActive.value = false
}

function search() {
  console.log(inputValue.value)
}
</script>

<template>
<div>
  <img @click="openInput" :class="{'img-ani': isAni}" class="img-transition" src="/icons/Header/search-icon.svg">
  <Transition name="slide"
    @after-enter="InputFocus"
    @after-leave="aniActive = false" 
  >
    <input v-show="isAni" @blur="focusOut" ref="input" class="input" type="text" v-model="inputValue">
  </Transition>
</div>
</template>

<style scoped>
div {
  box-shadow:0px 0px 0px 5px var(--white-2) inset;
  border-radius: 18px;
  padding: 0.75rem;
  transition: .5s;
  display: flex;
  gap: 0.3rem;
  justify-content: center;
}

div > img{
  cursor: pointer;
}

.input {
  border: none;
  background: none;
  outline: none;
  color: var(--white-2);
  font: var(--text);
  width: 20rem;
}

.slide-enter-active {
  animation: slide 1s ease-in-out;
}
.slide-leave-active {
  animation: slide 0.3s reverse ease;
}

@keyframes slide {
  0% {
    width: 0;
  }
  100% {
    width: 20rem;
  }
}

.img-transition {
  transition: v-bind(imgChangeSpeed + "s") ease-in-out;
}

.img-ani {
  transform: rotate(90deg);
}

</style>