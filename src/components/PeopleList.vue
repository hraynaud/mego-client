<template>
  <div>
    <PersonCard v-for="p in people" :p="p" :key="p.name" />
  </div>
</template>
<script setup lang="ts">
import { PersonModel } from '../core/models';
import PersonCard from '../components/PersonCard.vue';
import { PropType } from 'vue';

defineProps({
  people: Array as PropType<PersonModel[]>,
});
</script>
<style lang="scss"></style>
