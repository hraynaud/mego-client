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
        <q-card class="project-card" v-for="p in projects" :key="p.id">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>"{{ p.attributes.name }}"</q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>
          </q-item>

          <img
            :src="`http://localhost:9000/public/images/${p.attributes.topicImage}`"
          />
          <q-card-section>
            {{ p.attributes.description }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { projectService } from '../core/services';
import { jsonResponseHandler } from '../core/services';
import { ref, onMounted } from 'vue';

const friend = ref();
const topic = ref();
const friends = ref([]);
const topics = ref([]);
const projects = ref([]);

let submitted = false;

const onSubmit = (e) => {
  submitted = true;
  console.log(submitted);
  const friendId = friend?.value?.id;
  const topicId = topic?.value?.id;
  loadProjects({
    friend: friendId,
    topic: topicId,
  });
};
const loadProjects = (params) => {
  return projectService
    .searchProjects(params)
    .then((resp) => setData(resp))
    .catch(function (error) {
      console.log(error);
    });
};

const setData = (response) => {
  setProjects(response.data);
  setFriends(response.data);
  setTopics(response.data);
};

const setProjects = (jsonResponse) => {
  projects.value = getSortedData(jsonResponse, 'projects', 'name');
};

const setFriends = (jsonResponse) => {
  friends.value = getSortedData(jsonResponse, 'friends', 'firstName');
};

const setTopics = (jsonResponse) => {
  topics.value = getSortedData(jsonResponse, 'topics', 'name');
};
const getSortedData = (jsonResponse, data, key) => {
  if (jsonResponse[data])
    return jsonResponseHandler.setSortedData(jsonResponse, data, key);
  else return [];
};

onMounted(() => {
  loadProjects();
});
</script>
<style lang="scss" scoped>
.project-card {
  width: 100%;
  max-width: 250px;
}
.search-filter {
  // min-width: 250px;
  // max-width: 300px;
}
</style>
