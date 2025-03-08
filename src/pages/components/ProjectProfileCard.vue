<template>
  <q-card class="project-card">
    <q-card-section horizontal>

      <q-card-section class="q-py-xl">
        <q-item>
          <q-item-section avatar>
            <user-avatar :data="userAvatarData" cls="large" />
          </q-item-section>

          <q-item-section class="description">
            {{ p.description }}
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card-section>
  </q-card>



</template>
<script setup lang="ts" allowjs: true>
import { ProjectModel } from '../../core/models';
import { AvatarData } from './UserAvatar.vue';
import UserAvatar from './UserAvatar.vue';
import { defineProps, computed } from 'vue';


const props = defineProps<{
  p: ProjectModel,
}>();

const userAvatarData = computed<AvatarData>(() => {
  return {
    imgUrl: props.p?.ownerProfileImageUrl,
    isVisible: props.p?.ownerAvatarUrl == 'anonymous.png' ? false : true,
    tooltip: false
  } as AvatarData
})

</script>
<style lang="scss">
@import "../../css/user-avatar.scss";
</style>
<style lang="scss" scoped>
.project-card {
  min-height: 10rem;

  .name {
    padding-top: 15px;
    font-weight: bold;
  }

  .description {
    font-size: 16px;
  }
}
</style>
