<template lang="">
  <q-page style="max-height: 90vh; overflow-y: scroll">
    <page-header>{{projectName}}</page-header>
    <project-profile-card :p="project" />
    <!-- <q-card class="q-my-xs">
      <q-card-section>
        <p class="text-h6">Followers</p>
          <EndorsementList :endorsements="endorsers" :deleteable=false role="endorser"/>
      </q-card-section>
    </q-card>

    <q-card class="q-my-xs">
        <q-card-section>
          <p class="text-h6">Endorsees</p>
          <EndorsementList :endorsements="endorsees" :deleteable=true role="endorsee"/>
        </q-card-section>
    </q-card> -->
  </q-page>
</template>
<script setup lang="ts" allowJs: true>
import { ProjectModel } from 'src/core/models';
import { projectApi,projecteService } from 'src/core/services';
import { ref, computed, watch, onMounted } from 'vue';
import ProjectProfileCard from '../components/ProjectProfileCard.vue';
import { useRoute } from 'vue-router';
import PageHeader from 'src/components/PageHeader.vue';

const route = useRoute();

const project = ref({} as ProjectModel);
const projectName = computed(() => `${project.value.name}`)


watch(
  () => route.params.projectId,
  async () => {
    loadProject()
  }
)

const loadProject = () => {
  const id =  route.params.projectId;
  projectApi
    .findProject(id)
    .then(function (resp: { data: any }) {
        console.log(resp.data)
        project.value = projecteService.buildProject(resp.data.data)
        console.log(project.value)
    })
}

onMounted(() => {
  loadProject()
});

</script>
