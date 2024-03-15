<script setup lang="ts">
import { QCardActions, QCardSection } from "quasar";

const props = defineProps<{
  id: number;
}>();

const data = await serverFunction("findBuild", props.id);
if (isServerError(data)) throw createError("Build not found");

const stats = computed(() => {});
</script>

<template>
  <!-- <div class="buildWrapper">
    <SystemFlex class="buildCard"
        direction="column"
        gap="small"
        padding="normal" 
        background="dark" 
        radius="outer"
    
        width="16.375rem"
    >
        <SystemFlex radius="inner" overflow="hidden" height="12.5rem">
            <img style="width: 100%; height: 100%; object-fit: cover;" :src="data?.images[0]" :alt="data.title">
        </SystemFlex>
        <h2 class="buildTitle">{{ data.title }}</h2>
    
        <SystemFlex gap="small">
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/blocks.svg" size="small" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ data.blockCount }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="2px">
                <SystemIcon src="/icons/views.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ data.views }}</span>
            </SystemFlex>
            <SystemFlex align-items="center" gap="tiny">
                <SystemIcon src="/icons/download.svg" size="tiny" ratio="height" color="light-grey" />
                <span class="light-greyThick">{{ data.downloads }}</span>
            </SystemFlex>
        </SystemFlex>
        <SystemFlex
            gap="small"
        >
            <Username :username="data.user.minecraftName" :user-id="data?.user.id" />
            <SystemFlex 
                align-items="center"
                gap="4px"   
            >
                <SystemIcon src="/icons/size.svg" size="tiny" ratio="height" color="grey" />
                <span class="greyThick">{{ data?.size }}</span>
            </SystemFlex>
            <span class="greyThick">/{{ data?.difficulty }}</span>
        </SystemFlex>
    </SystemFlex>

    <BuildHover 
        :build="data"


        
    />
</div> -->

  <QCard flat dark bordered class="col-3">
    <QCardSection class="q-pa-sm">
      <QImg
        :src="data.images[0]"
        :alt="data.title"
        :draggable="false"
        placeholder-src="https://t4.ftcdn.net/jpg/02/97/01/65/360_F_297016511_NWrJG1s3mpyjqD3hwdKidfYsvhEnrPm4.jpg"
        error-src="https://t4.ftcdn.net/jpg/02/97/01/65/360_F_297016511_NWrJG1s3mpyjqD3hwdKidfYsvhEnrPm4.jpg"
        fit="cover"
        loading="lazy"
        class="rounded-borders"
      />
    </QCardSection>
    <QCardSection class="q-pl-sm q-pt-none q-pr-sm q-pb-none">
      <div class="text-h6 text-grey-3 title-ellipsis">
        {{ data.title }}{{ data.title }}{{ data.title }}
      </div>
    </QCardSection>
    <QCardSection horizontal class="q-pa-sm q-gutter-sm">
      <QCardSection class="row items-center q-pa-none">
        <QIcon name="sym_r_deployed_code" color="grey-8" size="sm" />
        <div class="text-subtitle2 text-grey-7 text-weight-bold">
          {{ data.blockCount }}
        </div>
      </QCardSection>
      <QCardSection class="row items-center q-pa-none">
        <QIcon name="sym_r_visibility" color="grey-8" size="sm" />
        <div class="text-subtitle2 text-grey-7 text-weight-bold">
          {{ data.views }}
        </div>
      </QCardSection>
      <QCardSection class="row items-center q-pa-none">
        <QIcon name="sym_r_download" color="grey-8" size="sm" />
        <div class="text-subtitle2 text-grey-7 text-weight-bold">
          {{ data.downloads }}
        </div>
      </QCardSection>
    </QCardSection>
  </QCard>
</template>

<style scoped lang="scss">
.title-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
