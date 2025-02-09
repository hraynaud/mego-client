<template>
  <div class="text-center" :class="cls">
    <q-avatar class="avatar" v-if="data.isVisible">
      <avatar-badge :role="data.role" />
      <img :src="data.imgUrl" />
    </q-avatar>
    <q-avatar v-else :icon="data.icon" class="avatar anon icon">
      <avatar-badge :role="data.role" />
    </q-avatar>

    <q-tooltip
      v-if="data.tooltip"
      class="text-primary transparent text-weight-bold text-subtitle2"
    >
      {{ data.name }}
    </q-tooltip>
    <div v-if="data.tooltip == false" style="font-size: 10px; color: $primary">
      {{ data.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarBadge from './AvatarBadge.vue';
export interface AvatarData {
  imgUrl: string | undefined;
  isVisible: boolean;
  icon: string;
  role: string | undefined;
  tooltip: boolean;
  name?: string;
}

defineProps<{
  data: AvatarData;
  cls?: string;
}>();
</script>
<style lang="scss">
@import '../css/user-avatar.scss';
</style>
<style lang="scss" scoped></style>
