<template>
  <q-card class="endorsement-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ e.topic }}</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
      </q-item-section>
    </q-item>

    <img :src="`http://localhost:9000/public/images/${e.topicImage}`" />

    <q-card-section> {{ e.description }} </q-card-section>
  </q-card>
</template>

<script setup>
import { EndorsementModel } from '../core/models';

defineProps({
  e: EndorsementModel,
});
</script>

<style lang="scss">
.endorsement-card {
  width: 100%;
  max-width: 250px;
}
</style>
