<script setup lang="ts">
const buildId = Number(useRoute().params.id)
if (isNaN(buildId)) throw createError("Invalid build id")

const build = await serverFunction("findBuild", buildId)
if (isServerError(build)) throw createError("Build not found")
const padding = getReactiveSidePadding()

const allComments = await serverFunction("getBuildComments", buildId)
if (isServerError(allComments)) throw createError("Failed to get build comments")

const comments = allComments.filter((comment) => comment.type === "Comment")
const replies = allComments.filter((comment) => comment.type === "Reply")

const testEditor = ref("")
</script>

<template>
  <div :class="`${padding} full-width q-pt-lg q-pb-xl`">
    <BuildProductpageview :data="build" :comments="comments" />
    <QEditor
      v-model="testEditor"
      dense
      :toolbar="[
        ['left', 'center', 'right', 'justify'],
        ['bold', 'italic', 'strike', 'underline'],
        ['hr', 'link'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7',
            ],
          },
          'removeFormat',
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource'],
      ]"
      min-height="10rem"
    />

    <BuildComment
      v-for="comment in comments"
      :data="comment"
      :replies="replies.filter((curr) => curr.replyTo === comment.id)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
