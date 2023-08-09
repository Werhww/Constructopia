<template>
  <Suspense>
    <BuildOpen
      v-on:share="share"
      v-on:3d-editor="open3dEditor"
      v-on:delete="deleteBuildPromt"
      v-on:save="saveBuildChangesPromt"
      :build-id="build"
    />

    <template #fallback>
      <BuildLoading/>
    </template>
  </Suspense>

  <!-- <BuildListRecommended title="Recommended" /> -->

  <ComponentAlert
    v-if="showAlert"
    :alert="alertMessage"
    :user-interaction="alertType"
    v-on:close="alertClose"
    v-on:confirm="alertConfirm"
  />
  <ComponentBlur v-if="showAlert" />
</template>

<script setup lang="ts">
const { build } = useRoute().params;
const router = useRouter();

definePageMeta({
  title: "Build",
  routesToHere: [
    { name: 'Home', path: '/'},
    { name: 'Builds', path: '/builds'},
    { name: 'Build', path: '/build'}
  ]
});

onErrorCaptured(() => {
  console.log("maby an error");
});

const showAlert = ref(false);
const alertMessage = ref("");
const currentAlertType = ref("");
const alertType = ref(false);

const newBuildData = ref({
  title: "",
  description: "",
  difficulty: "",
});

function deleteBuildPromt() {
  currentAlertType.value = "delete"
  alertMessage.value = "Are you sure you want to delete this build?"
  alertType.value = true
  showAlert.value = true
}

function saveBuildChangesPromt(newData: any) {
  currentAlertType.value = "save"
  alertMessage.value = "Are you sure you want to save these changes?"
  alertType.value = true
  showAlert.value = true

  newBuildData.value = newData
}

function alertClose() {
  showAlert.value = false
  currentAlertType.value = ""
}

async function alertConfirm() {
  
  if(currentAlertType.value == "delete") {
    await deleteBuild(build as string)
    console.log("end of deleteing build")
    router.push("/builds/test")
  } if (currentAlertType.value == "save") {
    /* save build changes */
    console.log("saveed build changes")
  }

  
  alertClose()
}

function share() {
  console.log("share");
}

function open3dEditor() {
  console.log("open 3d editor");
}
</script>