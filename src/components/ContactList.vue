<template>
  <div class="q-gutter-md row">
    <person-card v-for="p in people" :p="p" :key="p.firstName" />
  </div>
</template>
<script setup lang="ts">
import { PersonModel } from '../core/models';
import PersonCard from '../components/PersonCard.vue';

defineProps<{ people: PersonModel[] }>();
</script>
