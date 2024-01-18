<template>
  <q-card class="project-card">
    <q-card-section>
      <div class="project-topic text-h4 text-center q-mb-sm">
        {{ p?.name }}
      </div>

      <user-avatar :data="avatarData" class="large" />

      <div class="q-pa-md project-description">
        {{ p?.description }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="row items-center">
      <div class="q-pa-md path">
        <q-btn round color="primary" icon="article" :to="projectPath(p?.id)">
          <!-- <q-icon name="info" size="xl"></q-icon> -->
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ProjectModel } from '../core/models';
import UserAvatar, { AvatarData } from './UserAvatar.vue';
import { defineProps, computed } from 'vue';

const projectPath = (id: string) => `/project/${id}`;
const props = defineProps<{
  p: ProjectModel;
}>();

const avatarData = computed<AvatarData>(() => {
  return {
    imgUrl: props.p?.ownerProfileImageUrl,
    isVisible: true,
    icon: '',
    role: '',
    tooltip: false,
  } as AvatarData;
});
</script>
<style lang="scss">
.project-card .q-card__section--vert {
  padding: 0px;
}

.project-card {
  width: 460px;
  height: 500px;
  padding: 0px;
  border-radius: 8px;
}

.project-topic {
  font-weight: 100;
  background-color: $secondary;
  padding-top: 4%;
  padding-bottom: 10%;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 175px;
}

.project-description {
  height: 175px;
}
</style>
