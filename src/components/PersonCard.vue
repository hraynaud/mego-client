<template lang="">
  <q-card class="person-card">
    <q-card-section class="">
      <div class="avatar-wrapper">
        <q-avatar size="150px">
          <img src="https://xsgames.co/randomusers/avatar.php?g=female" />
        </q-avatar>
        <div class="name">
          {{ p.firstName }}
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section>
      <div class="row mini-profile">
        <div class="col">
          <div class="item-count">
            {{ p.incomingEndorsementsCount() }}<br />Endorsers
          </div>
        </div>
        <div class="col">
          {{ p.outgoingEndorsementsCount() }}<br />Endorsees
        </div>
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
