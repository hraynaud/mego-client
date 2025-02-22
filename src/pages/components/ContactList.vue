<template>
  <div class="q-gutter-md row">
    <div v-for="p in people" :p="p" :key="p.firstName">
      <router-link :to="`/person/${p.id}`">
        <person-card :p="p" />
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PersonModel } from '../../core/models';
import PersonCard from './PersonCard.vue';
import { RouterLink } from 'vue-router';

defineProps<{ people: PersonModel[] }>();
</script>
