<template>
<section>
    <div class="new-build">
        <ComponentImageImport v-on:image-imported="asignThumbnail"/>
        <div class="build-details">
            <ComponentInput v-model="title" class="build-title" placeholder="title" font_size="2.5rem" width="100%" :maxlength="35"/>
            <div class="build-undertitel">
                <BuildOpenDifficulty v-model="difficulty" :white="true" /> 
                <ComponentLitematicImport v-on:litematic-imported="asignLitematic"/>
                <div v-if="isLitematicImported" class="build-open-3d">
                    <img src="/icons/build/3d-icon-inverted.svg">
                    <p>open 3d editor</p>
                </div>
            </div>
            <textarea v-model="description" rows="18" maxlength="350" placeholder="description...." class="edit-input edit-description"></textarea>
        </div>
    </div>
    <div class="buttons">
        <ComponentButton @click="router.back()" label="cancel" bg_color="var(--inventory-item-background)"  color="var(--white)" />
        <ComponentButton @click="createBuild" label="save" bg_color="#21611B" color="var(--white)"/>
    </div>
</section>
</template>

<script setup lang="ts">

const router = useRouter()
const isLitematicImported = ref(false)

definePageMeta({
    title: 'New Build'
})

const title = ref('')
const difficulty = ref('easy')
const description = ref('')
const thumbnail = ref()
const litematic = ref()
const inventory = ref<{
    amount: number
    blockId: string
}[]>([])

function asignThumbnail(image: any){
    thumbnail.value = image
}

function asignLitematic(file: any){
    litematic.value = file
    isLitematicImported.value = true
}

function getInventory() {
    if(!litematic.value) return


}

function createBuild(){
    console.log(title.value, difficulty.value, description.value, thumbnail.value, litematic.value)
}
</script>

<style scoped>
section {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 2.938rem;
}


.new-build {
    display: flex;
    gap: 0.625rem;
}

.build-details {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
}


.build-undertitel {
    display: flex;
    gap: 1.2rem;
}

.build-file-import, .build-open-3d{
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font: var(--undertitle);
    color: var(--white);
    cursor: pointer;
}

.build-file-import p:last-child{
    text-decoration: underline;
    text-underline-offset: 0.3rem;
    cursor: help;
}
.litematic-import {
    display: block;
}

.build-open-3d {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
}


.edit-input {
    outline: none;
    border: none;
    background-color: transparent;
    resize: none;
    transition: all 0.2s ease;
    color: var(--white);
}

.edit-description {
    font: var(--text);
    width: 42.5rem;
    flex: 1;
}

.buttons {
    display: flex;
    justify-content: space-between;
}
</style>