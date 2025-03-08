<template>
  <q-page style="max-height: 90vh; overflow-y: scroll">
    <page-header cls="avatar-left-large">{{ projectName }}</page-header>

    <project-profile-card :p="project" />

    <div class="q-pa-md">
      <h4 class="sub-header">Current Progress</h4>

      <div class="row q-gutter-md">
        <div class="col">
          <q-card>
            <q-card-section>Completed</q-card-section>
            <q-card-section>
              <q-list separator>
                <q-expansion-item v-for="item in project.progress" :key="item" :label="item" icon="check_circle_outline"
                  class="completed">
                  {{ item }}
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card>
            <q-card-section>Todo</q-card-section>
            <q-card-section>
              <q-list separator>

                <q-expansion-item v-for="item in project.openItems" :key="item" :label="item" icon="rotate_right"
                  class="in-progress">
                  {{ item }}
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col">
          <q-card>
            <q-card-section>
              Blocked
            </q-card-section>
            <q-card-section>
              <q-list separator>
                <q-expansion-item v-for="item in project.roadBlocks" :key="item" :label="item" icon="block"
                  class="blocked">
                  {{ item }}
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-card>
      <q-card-section>
        <q-card-section-item>
          <p class="text-h6 ">Tags</p>
        </q-card-section-item>
        <q-card-section-item>
          <q-chip color="teal" text-color="white" icon="bookmark">fencing</q-chip>
          <q-chip color="teal" text-color="white" icon="bookmark">Art</q-chip>
          <q-chip text-color="black">
            <q-avatar icon="bookmark" color="red" text-color="white" />
            Bookmark
          </q-chip>
        </q-card-section-item>
      </q-card-section>
    </q-card>

  </q-page>
</template>
<script setup lang="ts" allowJs: true>
import { ProjectModel } from 'src/core/models';
import { projectApi, projectService } from 'src/core/services';
import { ref, computed, watch, onMounted } from 'vue';
import ProjectProfileCard from './components/ProjectProfileCard.vue';
import { useRoute } from 'vue-router';
import PageHeader from 'src/pages/components/PageHeader.vue';

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
  const id = route.params.projectId;
  projectApi
    .findProject(id)
    .then(function (resp: { data: unknown }) {
      project.value = projectService.build(resp.data.data)
      console.log(project.value)

    })
}

onMounted(() => {
  loadProject()
});

</script>
<style lang="scss">
.q-item__section--side.q-item__section--avatar>.q-icon {
  .blocked & {
    color: grey;
  }

  .completed & {
    color: green;
  }

  .in-progress & {
    color: blue;
  }
}

h4.sub-header {
  font-weight: 200;

}
</style>
