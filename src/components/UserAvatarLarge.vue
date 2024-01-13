<template>
  <div class="text-center">
    <q-avatar class="avatar" v-if="data.isVisible">
      <img :src="data.imgUrl" />
    </q-avatar>
    <q-avatar v-else :icon="data.icon" class="avatar anon icon"> </q-avatar>
  </div>
</template>

<script setup lang="ts">
import { EndorsementPathModel } from '../core/models';
export interface AvatarData {
  imgUrl: string;
  isVisible: boolean;
  icon: string;
}
defineProps<{
  e: EndorsementPathModel;
  data: AvatarData;
}>();
</script>

<style lang="scss" scoped>
.large {
  margin-top: -6.75rem;

  .avatar {
    height: 125px;
    width: 125px;
    margin-bottom: 2%;
    margin-top: 1%;
  }

  .anon {
    background-color: $tertiary;
    color: darkslategrey;
    font-weight: bold;
  }

  .icon {
    font-size: 242px;
    border: 1px solid;
    border-radius: 50%;
  }
}
</style>
