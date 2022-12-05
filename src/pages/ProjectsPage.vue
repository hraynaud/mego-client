<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Projects in your circle</h3>

      <q-form @submit.prevent="onSubmit">
        <div class="row items-baseline justify-start q-gutter-lg">
          <label>Filter:</label>
          <div class="col-2 search-filter">
            <q-select
              v-model="friend"
              single
              :options="friends"
              :option-value="(opt) => opt?.id"
              :option-label="(opt) => opt?.attributes?.firstName"
              use-chips
              label="Friends"
            />
          </div>
          <div class="col-4 search-filter">
            <q-select
              v-model="topic"
              single
              :options="topics"
              :option-value="(opt) => opt?.id"
              :option-label="(opt) => opt?.attributes?.name"
              use-chips
              label="Topics"
            />
          </div>
          <q-btn round color="primary" icon="search" type="submit" />
        </div>
      </q-form>
    </div>
    <div class="q-pa-md">
      <h5>Search Results</h5>
      <div class="q-gutter-md row items-start">
        <ProjectList :projects="projects"></ProjectList>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import ProjectList from '../components/ProjectList.vue';
import { useProjectList } from 'src/composables/use-project-list';

const { projects } = useProjectList();

// let submitted = false;

const onSubmit = (e) => {
  // submitted = true;
  const friendId = friend?.value?.id;
  const topicId = topic?.value?.id;
  loadProjects({
    friend: friendId,
    topic: topicId,
  });
};
</script>
<style lang="scss" scoped>
.search-filter {
  // min-width: 250px;
  // max-width: 300px;
}
</style>
