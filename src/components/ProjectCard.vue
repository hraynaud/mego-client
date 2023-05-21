<template lang="">
  <q-card class="project-card">
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="p.ownerAvatarUrl" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label
          ><p>{{ p.name }}</p></q-item-label
        >

        <q-item-label caption>{{ p.topicName }}</q-item-label>
      </q-item-section>
    </q-item>

    <!-- <img :src="`/images/${p.topicImage}`" /> -->
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
