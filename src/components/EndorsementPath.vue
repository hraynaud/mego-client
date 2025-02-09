<template>
  <q-separator />
  <q-card-section class="row items-center endorsement-path-wrapper">
    <div class="q-py-sm path">
      <router-link
        v-for="p in path"
        :key="p.id"
        :to="profilePath(p.id)"
        class="path-el"
      >
        <user-avatar
          :data="getPathElementAvatarData(p as PathAvatar)"
          class="path-el-content"
          :cls="'tiny' + ' ' + roler(p)"
        />
      </router-link>
    </div>
  </q-card-section>
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
    icon: roler(p),
    role: p.role,
    tooltip: true,
    name: p.name,
  };
};

const roler = (p: PathAvatar) => {
  const role = p.role;

  if (role == 'endorser') {
    return 'thumb_up';
  } else if (role == 'endorsee') {
    return 'psychology';
  } else if (role == 'contact') {
    return 'link';
  } else if (role == 'me') {
    return 'me';
  }
};
</script>
<style>
.path-el {
  .avatar.anon.icon {
    &.tiny.thumb_up {
      .q-avatar__content {
        font-size: 24px;
      }
    }
    &.tiny.psychology {
      .q-avatar__content {
        font-size: 32px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.endorsement-path-wrapper {
  margin-top: 30px;
}

.path {
  height: auto;
  min-width: 160px;

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
    left: 33px;
    top: -35%;
    width: 18px;
    margin: 0px 2px;
    border-bottom: 2px solid black;
  }
}
</style>
