<template lang="">
  <q-card class="person-card">
    <q-card-section class="" horizontal>
      <div class="avatar-wrapper">
        <q-avatar size="100px">
          <img :src="p.profileImageUrl" />
        </q-avatar>
        <div class="name">
          {{ p.firstName }}
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section horizontal>
      <div class="row mini-profile">
        <div class="col">
          <div class="item-count">{{ p.endorsers.length }}<br />Endorsers</div>
        </div>
        <div class="col">{{ p.endorsees.length }}<br />Endorsees</div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { PersonModel } from '../core/models';
import { defineProps } from 'vue';

defineProps({
  p: PersonModel,
});
</script>

<style lang="scss">
.person-card {
  max-width: 215px;
  .name {
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
