<template lang="">
  <div>
    <div class="q-gutter-md row items-start">
      <PersonCard v-for="p in people" :p="p" :key="p.name" />
    </div>
  </div>
</template>
<script setup>
import { PersonModel } from '../core/models';
import PersonCard from './PersonCard.vue';

defineProps({
  people: [PersonModel],
});
</script>
<style lang="scss"></style>
