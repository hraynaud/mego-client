<template>
      <q-card class="project-card">
        <q-card-section horizontal>
          <q-card-section class="profile-img q-pa-sm">
            <div class="profile-img-wrapper">
              <user-avatar :data="avatarLargeData" class="large profile"/>
            </div>
          </q-card-section>
          <q-card-section>
            <div >
              <div>
                {{ p.description }}
              </div>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <q-card-section-item >
            <p class="text-h6 ">Tags</p>
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
import { ProjectModel } from '../core/models';
import { AvatarData } from '../components/UserAvatar.vue';
import UserAvatar from '../components/UserAvatar.vue';
import { defineProps, computed } from 'vue';


const props = defineProps<{
  p: ProjectModel,
}>();

const avatarLargeData = computed<AvatarData>(()=>{ return {
  imgUrl: props.p?.ownerProfileImageUrl,
  isVisible:  props.p?.ownerAvatarUrl == 'anonymous.png' ? false : true,
  tooltip: false
} as AvatarData})

</script>
<style lang="scss">
.project-card {

  .name {
    padding-top: 15px;
    font-weight: bold;
  }
  .profile-img-wrapper {
  margin: auto;
  text-align: center;
}
}

.mini-profile {
  text-align: center;
  .item-count {
    color: $pink-12;
    $h-tags: ('h1');
  }
}
.centered {
  text-align: center;
}
</style>
