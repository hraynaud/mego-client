<template>
  <div>
    <div class="q-gutter-md row items-start">
      <ProjectCard v-for="p in projects" :p="p" :key="p.name" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ProjectModel } from '../core/models';
import ProjectCard from './ProjectCard.vue';

defineProps<{ projects: ProjectModel[] }>();
</script>
<style lang="scss"></style>
