<template>
  <div class="endorsement-path">
    <q-separator />
    <q-card-section class="row items-center">
      <div class="q-py-md path">
        <router-link
          v-for="p in path"
          :key="p.id"
          :to="profilePath(p.id)"
          class="path-el"
        >
          <user-avatar
            :data="getPathElementAvatarData(p as PathAvatar)"
            class="path-el-content small"
          />
        </router-link>
      </div>
    </q-card-section>
  </div>
</template>

<script setup lang="ts">
import { PathAvatar } from '../core/models';
import { RouterLink } from 'vue-router';
import UserAvatar from '../components/UserAvatar.vue';
import { AvatarData } from '../components/UserAvatar.vue';

const profilePath = (id: string) => `/person/${id}`;

defineProps<{
  path: PathAvatar[];
}>();

const getPathElementAvatarData = (p: PathAvatar) => {
  return <AvatarData>{
    imgUrl: p.avatar_url,
    isVisible: p.is_visible,
    icon: p.role == 'endorsee' ? 'psychology' : 'psychology_alt',
    role: p.role,
    tooltip: true,
    name: p.name,
  };
};
</script>

<style lang="scss" scoped>
.endorsement-card {
  .q-card__section--vert {
    padding: 0px;
  }
  .path {
    height: 80px;
    min-width: 160px;
    position: relative;
    padding: 8px;
    .path-el-content {
      display: inline;
    }

    .path-el:not(:last-child) {
      margin-right: 27px;
      position: relative;
    }

    .path-el:not(:last-child):after {
      position: absolute;
      content: '';
      left: 61px;
      top: 0%;
      width: 25px;
      height: 11px;
      border-bottom: 2px solid black;
    }
  }
}
</style>
