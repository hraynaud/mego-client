<template>
  <q-page>
    <page-header icon="forum">Bulletin Board</page-header>
    <div class="flex flex-center column">
      <div class="row" style="min-height: 400px; width: 95%; padding: 24px">
        <div id="parent" class="fit row wrap justify-around" style="overflow: hidden">
          <div class="col-5">
            <h4>Recent Projects</h4>
            <div class="q-gutter-md row items-start" style="overflow: scroll; height: 900px">
              <ProjectCard v-for="p in projects" :p="p" :key="p.id" />
            </div>
          </div>

          <div class="col-3" style="overflow: auto">

          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import PageHeader from 'src/pages/components/PageHeader.vue';
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
import { PersonModel, ProjectModel } from 'src/core/models';

import { ref, onBeforeMount } from 'vue';

const me = ref({} as PersonModel);

const loadme = () => {
  const id = authService.currentUser()['uid'];

  peopleApi.findPerson(id).then(function (resp: { data: { data: unknown } }) {
    me.value = peopleService.buildPerson(resp.data.data);
  });
};

const projects = ref<ProjectModel[]>([]);

const loadProjects = async () => {
  const resp = await projectService.random();
  resp.map((p: unknown) => {
    projects.value.push(projectService.build(p));
  });
};

onBeforeMount(() => {
  loadme();
  loadProjects();
});
</script>
