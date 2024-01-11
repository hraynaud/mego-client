<template>
  <div class="text-center">
    <q-avatar class="avatar" v-if="isVisible">
      <img :src="avatar" />
    </q-avatar>
    <q-avatar v-else icon="psychology" class="avatar anon icon"> </q-avatar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EndorsementPathModel } from '../core/models';

const props = defineProps<{
  e: EndorsementPathModel;
  displayType: string;
}>();

const avatar = computed(() => {
  return props.e?.endorseeProfileImageUrl;
});

const isVisible = computed(() => {
  return props.e?.endorseeProfileImageUrl == 'anonymous.png' ? false : true;
});
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
