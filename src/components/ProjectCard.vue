<template lang="">
  <!-- <q-card class="project-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="p.ownerAvatarUrl" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label
          ><p>{{ p.name }}</p></q-item-label
        >

        <q-item-label caption>{{ p.topicName }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-card-section>
      {{ p.description }}
    </q-card-section>
  </q-card> -->

  <q-card class="endorsement-card">
    <q-card-section avatar>
      <div class="endorsement-topic text-h6 text-center q-mb-xs">
        {{ p.topicName }}
      </div>

      <user-avatar :data="avatarData" class="small" />

      <div class="q-pa-sm endorsement-description">
        {{ p.description }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { ProjectModel } from '../core/models';
import UserAvatar, { AvatarData } from './UserAvatar.vue';
import { defineProps, computed } from 'vue';

const props = defineProps<{
  p: ProjectModel;
}>();

const avatarData = computed<AvatarData>(() => {
  return {
    imgUrl: props.p?.ownerAvatarUrl,
    isVisible: true,
    icon: '',
    role: '',
    tooltip: false,
  } as AvatarData;
});
</script>
<style lang="scss">
// .project-card {
//   width: 100%;
//   max-width: 250px;
// }

.endorsement-card {
  width: 200px;
  height: 225px;
  padding: 0px;
  border-radius: 8px;
}

.endorsement-card .q-card__section--vert {
  padding: 0px;
}

.endorsement-topic {
  font-weight: 100;
  background-color: $secondary;
  padding-top: 4%;
  padding-bottom: 10%;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 65px;
}

.endorsement-description {
  height: 85px;
}
</style>
