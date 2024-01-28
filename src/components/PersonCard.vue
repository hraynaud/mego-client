<template>
  <q-card class="person-card">
    <q-card-section class="q-pa-sm" horizontal>
      <div class="avatar-wrapper">
        <q-avatar size="75px">
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
        <div class="col-4">
          {{ p.endorsers.length }}
        </div>
        <div class="col-8 item-count">Endorsers</div>

        <div class="col-4">
          {{ p.endorsees.length }}
        </div>
        <div class="col-8 item-count">Endorsees</div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
import { PersonModel } from '../core/models';
import { defineProps } from 'vue';

defineProps<{
  p: PersonModel;
}>();
</script>

<style lang="scss">
.person-card {
  // max-width: 215px;
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
    color: $blue-12;
    $h-tags: ('h1');
  }
}
.centered {
  text-align: center;
}
</style>
