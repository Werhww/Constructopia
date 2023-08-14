<template>
<div class="alert">
    <p class="title">Wow, big man</p>
    <p :class="{alertText: true, warning: isWarining, default: !isWarining}">{{ alert }}</p>

    <div class="buttons" v-if="userInteraction">
        <ComponentButton @click="$emit('cancel')" label="cancel" bg_color="var(--red)"  color="var(--white)" />
        <ComponentButton @click="$emit('confirm')" label="confirm" bg_color="var(--green)" color="var(--white)"/>
    </div>

    <ComponentButton v-else @click="$emit('confirm')" label="ok" bg_color="var(--green)" color="var(--white)"/>
</div>
</template>

<script setup lang="ts">
defineEmits(['cancel', 'confirm'])

defineProps<{
    alert: string
    userInteraction: boolean
    isWarining: boolean
}>()
</script>

<style scoped>
.alert {
    z-index: 11;

    position: fixed;
    top: 20rem;
    left: 50%;
    transform: translate(-50%, -50%);


    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    padding: 2rem;
    background: var(--dark);
    border-radius: var(--border-radius);
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
}

.title {
    font: var(--undertitle);
    color: var(--white);
}

.alertText {
    font: var(--text);
    width: 30rem;
    text-align: center;
}
.buttons {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}

.warning {
    color: var(--red);
}

.default {
    color: var(--white);
}
</style>