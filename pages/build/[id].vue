<template>
  <BuildOpen
    v-on:share="share"
    v-on:3d-editor="open3dEditor"
    :build-id="id"
    :build="buildDocumentData"
    :images="imagesDocumentData"
    :favorite="favorite"
    :inventory="InventoryItemsDocumentData"
    :loading="loading"
  />

  <!-- <BuildListRecommended title="Recommended" /> -->

  <ComponentAlert
    v-if="showAlert"
    :alert="alertMessage"
    :user-interaction="alertType"
    v-on:close="alertClose"
  />
  <ComponentBlur v-if="showAlert" />
</template>

<script setup lang="ts">
import {
  BuildDocument,
  ImageDocument,
  InventoryDocument
} from '@/utils/useTypes'

const router = useRouter();
const { id } = useRoute().params;

const loading = ref(false)

const favorite = ref(false);

const buildDocumentData = ref<BuildDocument>({
  buildId: '',

  userId: '',
  username: '',

  title: '',
  description: '',
  difficulty: '',
  blocks: 0,
  thumbnailIndex: 0,
  
  views: 0,

  date: {
      created: 0,
      lastEdit: 0
  }
});

const imagesDocumentData = ref<ImageDocument>({
  buildId: '',
  links: [],
})

const InventoryItemsDocumentData = ref<InventoryDocument[]>([])

onMounted(async () => {
  try {
    buildDocumentData.value = await getBuildDoc(id as string);
    imagesDocumentData.value = await getImages(id as string);
    InventoryItemsDocumentData.value = await getBuildInventory(id as string);

    loading.value = true
  } catch (error) {
    console.log(error);
  }
});

definePageMeta({
  title: "Build",
});

const showAlert = ref(false);
const alertMessage = ref("");
const alertType = ref(false);

function alertClose() {
  router.back();
}

/* Change to auth id for prod */
const userId = "123";

function share() {
  console.log("share");
}

function open3dEditor() {
  console.log("open 3d editor");
}
</script>

<style scoped></style>
