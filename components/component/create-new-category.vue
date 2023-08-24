<template>
<div class="new-category">
    <p>New category</p>

    <ComponentInput 
        placeholder="category name" 
        v-model="newName"
        font_size="1.5rem"
        width="stretch"
        :maxlength="MAX_CATEGORY_LENGTH"
    />
    <textarea placeholder="description..." :maxlength="MAX_CATEGORY_DESCRIPTION_LENGTH" v-model="newDescription"></textarea>

    <div class="buttons">
        <ComponentButton label="cancel" bg_color="var(--red)" color="var(--white)" @click="$emit('close')" />
        <ComponentButton label="create" bg_color="var(--green)" color="var(--white)" @click="createNewCategory(newName, newDescription)"/>
    </div>
</div>
</template>

<script setup lang="ts">
const prop = defineProps<{
    seach: string
    createNewCategory: (name: string, description: string) => void
}>()

const newName = ref(prop.seach)
const newDescription = ref()


defineEmits(['close'])
</script>

<style scoped>
.new-category {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    gap: 1rem;

    z-index: 10;

    background-color: var(--background);
    border: var(--white-2) 1px solid;
    border-radius: var(--border-radius);

    padding: 3rem 2rem;

    color: var(--white);
}

.new-category p {
    font-size: 2rem;
    text-align: center;
}

.new-category > textarea {
    width: 25rem;
    height: 10rem;
    border-radius: 10px 0 0 10px;

    background-color: transparent;
    border: none;
    resize: none;
    outline: none;

    color: var(--white);

    font-size: 1rem;
}

.buttons {
    display: flex;
    gap: 1rem;
}

</style>