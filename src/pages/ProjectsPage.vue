<template>
  <q-page>
    <page-header icon="engineering">Projects</page-header>
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <ProjectList :projects="projects"></ProjectList>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ProjectList from './components/ProjectList.vue';
import PageHeader from './components/PageHeader.vue';
import { useProjectList } from 'src/composables/use-project-list';
import { ProjectModel } from 'src/core/models';

const projects = useProjectList({}) as unknown as ProjectModel[];
</script>
