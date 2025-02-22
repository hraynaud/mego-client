<template>
  <q-avatar :icon="data.icon" :class="cls" class="avatar anon icon">
    <avatar-badge :role="data.role" />
  </q-avatar>
</template>

<script setup lang="ts">
import AvatarBadge from './AvatarBadge.vue';
export interface ThingAvatarData {
  imgUrl: string | undefined;
  icon: string | undefined;
  role: string | undefined;
}

defineProps<{
  data: ThingAvatarData;
  cls?: string;
}>();
</script>
<style lang="scss">
@import '../css/user-avatar.scss';
</style>
