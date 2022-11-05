<template>
  <q-card class="endorsement-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ e.topic }}</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
      </q-item-section>
    </q-item>

    <img :src="`/images/${e.topicImage}`" />

    <q-card-section> {{ e.description }} </q-card-section>
    <q-btn
      v-if="deleteable"
      class="gt-xs float-right"
      size="12px"
      flat
      dense
      round
      icon="delete"
      @click="bus.emit('delete-endorsement', e, idx)"
    />
  </q-card>
</template>

<script setup>
import { inject } from 'vue';
import { EndorsementModel } from '../core/models';

import bus from '../core/utils/event-bus';
const deleteable = inject('deleteable', false);

defineProps({
  e: EndorsementModel,
  idx: Number,
});
</script>

<style lang="scss">
.endorsement-card {
  width: 100%;
  max-width: 250px;
}
</style>
