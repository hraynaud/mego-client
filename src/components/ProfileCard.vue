<template>
  <div class="q-pa-md row items-start q-gutter-md">
  <q-card class="person-card">
    <q-card-section horizontal>
      <q-card-section class="profile-img" horizontal>
        <div class="profile-img-wrapper">
          <q-avatar size="150px">
            <q-img :src="p.profileImageUrl" />
          </q-avatar>
          <div class="name">
            {{ p.firstName }}
          </div>
        </div>
      </q-card-section>
      <q-card-section class="bio" >
        <div class="">
          <div class="name">
            {{ p.bio }}
          </div>
        </div>
      </q-card-section>
    </q-card-section>

   </q-card>

   <q-card class="person-card">
   <q-card-section class="brag" >
        <div class="q-pa-md q-gutter-sm">
          <h5 class="q-pb-sm q-mb-md">Ask me about:</h5>
          <q-chip color="teal" text-color="white" icon="bookmark">
        fencing
      </q-chip>

      <q-chip color="teal" text-color="white" icon="bookmark">
        Art
      </q-chip>
      <q-chip text-color="black">
        <q-avatar icon="bookmark" color="red" text-color="white" />
        Bookmark
      </q-chip>
        </div>
      </q-card-section>
    </q-card>
</div>
</template>
<script setup lang="ts" allowjs: true>
import { PersonModel } from '../core/models';
import { defineProps } from 'vue';
defineProps({
  p: PersonModel,
});
</script>
<style lang="scss">
.person-card {
  width: 100%;

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
