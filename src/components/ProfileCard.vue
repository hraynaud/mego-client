<template lang="">
  <q-card class="person-card">
    <q-card-section class="">
      <div class="avatar-wrapper">
        <q-avatar size="150px">
          <img :src="p.profileImageUrl" />
        </q-avatar>
        <div class="name">
          {{ p.firstName }}
        </div>
      </div>
    </q-card-section>
    <q-card-section class="">
      <div class="">
        <div class="name">
          {{ p.bio }}
        </div>
      </div>
    </q-card-section>

  </q-card>
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
  max-width: 215px;
  .name {
    padding-top: 15px;
    font-weight: bold;
  }
}
.avatar-wrapper {
  margin: auto;
  text-align: center;
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
