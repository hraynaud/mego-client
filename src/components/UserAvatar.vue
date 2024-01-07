<template>
  <div class="text-center user-avatar">
    <q-avatar class="avatar" v-if="isVisible">
      <img :src="avatar" />
    </q-avatar>
    <q-avatar v-else icon="psychology" class="avatar anon profile"> </q-avatar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EndorsementModel, PathAvatar } from '../core/models';

const props = defineProps<{
  e: EndorsementModel;
  displayType: string;
  p: PathAvatar;
}>();

const avatar = computed(() => {
  if (props.p?.avatar_url) return props.p.avatar_url;

  return props.displayType == 'endorsee'
    ? props.e?.endorseeAvatarUrl
    : props.e?.endorserAvatarUrl;
});

const isVisible = computed(() => {
  let visible = false;

  if (props.p != undefined) {
    return props.p?.is_visible;
  }

  if (props.e != undefined) {
    visible =
      (props.e?.endorserAvatarUrl || props.e?.endorseeAvatarUrl) ==
      'anonymous.png'
        ? false
        : true;
  }
  return visible;
});

const icon = (role: string) =>
  role == 'endorsee' ? 'psychology' : 'psychology_alt';
</script>

<style lang="scss" scoped>
.user-avatar {
  margin-top: -1.95rem;

  .avatar {
    width: 60px;
    height: 60px;
    margin-bottom: 2%;
    margin-top: 1%;
  }
}

.anon {
  background-color: $tertiary;
  color: darkslategrey;
  font-weight: bold;
  font-size: 70px;
}
</style>
