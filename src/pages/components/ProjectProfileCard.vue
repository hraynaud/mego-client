<template>
      <q-card class="project-card">
        <q-card-section horizontal>
          <q-card-section class="q-pa-sm">
            <div class="text-center card-header">
            <q-avatar icon="assignment_add"  class="avatar large icon project">
            </q-avatar>
            </div>
          </q-card-section>
          <q-card-section>
            <user-avatar :data="userAvatarData" cls="medium"/>
              <div>
                {{ p.description }}
              </div>
          </q-card-section>
        </q-card-section>
      </q-card>



      <q-card>
        <q-card-section>
          <q-card-section-item >
            <p class="text-h6 ">Ask me about</p>
          </q-card-section-item>
          <q-card-section-item  >
            <q-chip color="teal" text-color="white" icon="bookmark">fencing</q-chip>
            <q-chip color="teal" text-color="white" icon="bookmark">Art</q-chip>
            <q-chip text-color="black">
              <q-avatar icon="bookmark" color="red" text-color="white" />
              Bookmark
            </q-chip>
          </q-card-section-item>
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

const userAvatarData = computed<AvatarData>(()=>{ return {
  imgUrl: props.p?.ownerProfileImageUrl,
  isVisible:  props.p?.ownerAvatarUrl == 'anonymous.png' ? false : true,
  tooltip: false
} as AvatarData})

</script>
<style lang="scss">
@import "../../css/user-avatar.scss";
</style>
<style lang="scss" scoped>
.project-card {

  .name {
    padding-top: 15px;
    font-weight: bold;
  }
}


</style>
