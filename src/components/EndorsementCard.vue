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

    <img :src="`http://localhost:9000/public/images/${e.topicImage}`" />

    <q-card-section> {{ e.description }} </q-card-section>
    <q-btn
      class="gt-xs float-right"
      size="12px"
      flat
      dense
      round
      icon="delete"
      @click="$emit('delete', e, idx)"
    />
  </q-card>
</template>

<script setup>
import { EndorsementModel } from '../core/models';

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
