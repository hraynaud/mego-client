<template>
  <q-page>
    <page-header>Dashboard</page-header>
    <div class="flex flex-center column">
      <div
        class="row bg-blue-grey-2"
        style="min-height: 400px; width: 95%; padding: 24px"
      >
        <div
          id="parent"
          class="fit row wrap justify-around"
          style="overflow: hidden"
        >
          <div class="col-3" style="overflow: auto">
            <person-card :p="me" />
          </div>
          <div class="col-5" style="overflow: auto">
            <div class="q-gutter-md row items-start">
              <ProjectCard v-for="p in projects" :p="p" :key="p.id" />
            </div>
          </div>
          <div class="col-3 bg-grey-6" style="overflow: auto">
            <q-card class="no-border-radius">
              <q-card-section> Child #3 </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import PageHeader from 'src/pages/components/PageHeader.vue';
import PersonCard from 'src/pages/components/PersonCard.vue';
import ProjectCard from 'src/pages/components/ProjectCard.vue';
// import ProjectList from './components/ProjectList.vue';
// import { useProjectList } from 'src/composables/use-project-list';
import {
  peopleApi,
  peopleService,
  authService,
  projectApi,
  projectService,
} from '../core/services';
import { RandomProjectsResponses } from '../core/services/api/project.api';
import { PersonModel, ProjectModel } from 'src/core/models';

import { ref, onBeforeMount } from 'vue';

const me = ref({} as PersonModel);

const loadme = () => {
  const id = authService.currentUser()['uid'];

  peopleApi
    .findPerson(id)
    .then(function (resp: { data: { data: RandomProjectsResponses } }) {
      me.value = peopleService.buildPerson(resp.data.data);
    });
};

const projects = ref<ProjectModel[]>([]);

const loadProjects = () => {
  projectApi
    .randomProjects()
    .then((resp) => {
      resp.data.data.map((p: unknown) => {
        projects.value.push(projectService.build(p));
      });
    })
    .catch((error: unknown): void => {
      console.log(error);
    });
};

onBeforeMount(() => {
  loadme();
  loadProjects();
});
</script>
