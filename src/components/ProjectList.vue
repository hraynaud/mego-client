<template lang="">
  <div>
    <div class="q-gutter-md row items-start">
      <ProjectCard v-for="p in projects" :p="p" :key="p.uuid" />
    </div>
  </div>
</template>
<script setup>
import { ProjectModel } from '../core/models';
import ProjectCard from './ProjectCard.vue';
import { onMounted } from 'vue';

defineProps({
  projects: [ProjectModel],
});
</script>
<style lang="scss"></style>
