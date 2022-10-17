<template lang="">
  <q-card class="project-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ p.name }}</q-item-label>
        <q-item-label caption>Subhead</q-item-label>
      </q-item-section>
    </q-item>

    <img :src="`/images/${p.topicImage}`" />
    <q-card-section>
      {{ p.description }}
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ProjectModel } from '../core/models';
import { defineProps } from 'vue';

defineProps({
  p: ProjectModel,
});
</script>
<style lang="scss">
.project-card {
  width: 100%;
  max-width: 250px;
}
</style>
