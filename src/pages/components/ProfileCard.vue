<template lan="html">
      <q-card class="person-card">
        <q-card-section horizontal>
          <q-card-section class="q-pa-sm">
            <div class="text-center card-header">
              <user-avatar :data="avatarLargeData" cls="large"/>
            </div>

          </q-card-section>
        <q-card-section class="q-pa-none">
          <q-card-section class="q-pa-sm">
            {{ p.bio }}
          </q-card-section>


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
          <q-chip text-color="black" style="font-weight: 600;">
              <div style="font-weight: 900;"> {{ p.endorsees?.length}} &nbsp;</div>
              Connections
            </q-chip>
            <q-chip text-color="black" style="font-weight: 600;">
              <div style="font-weight: 900;"> {{ p.endorsers?.length}} &nbsp;</div>
              Endorsers
            </q-chip>

            <q-chip text-color="black" style="font-weight: 600;">
              <div style="font-weight: 900;"> {{ p.endorsees?.length}} &nbsp;</div>
              Endorsements
            </q-chip>
        </q-card-section>
      </q-card>
</template>
<script setup lang="ts" allowjs: true>
import { PersonModel } from '../../core/models';
import { AvatarData } from './UserAvatar.vue';
import UserAvatar from './UserAvatar.vue';
import { defineProps, computed } from 'vue';


const props = defineProps<{
  p: PersonModel,
}>();

const avatarLargeData = computed<AvatarData>(()=>{ return {
  imgUrl: props.p?.profileImageUrl,
  isVisible:  props.p?.profileImageUrl == 'anonymous.png' ? false : true,
  icon: 'psychology',
  role: undefined,
  tooltip: false
} as AvatarData})

</script>

<style lang="scss" scoped>

.person-card {
  .name {
    padding-top: 15px;
    font-weight: bold;
  }

}

.mini-profile {
  text-align: center;
  .item-count {
    color: $pink-12;
    $h-tags: ('h1');
  }
}

</style>
