<template>
  <q-page>
    <div>
      <h5>Project List</h5>

      <div class="main">
        <q-form @submit.prevent="onSubmit">
          <div class="row items-center justify-evenly">
            <h5>Search Projects:</h5>
            <div style="min-width: 250px; max-width: 300px">
              <q-select
                filled
                v-model="friend"
                single
                :options="friends"
                :option-value="(opt) => opt?.id"
                :option-label="(opt) => opt?.attributes?.firstName"
                use-chips
                label="Friends"
              />
            </div>
            <div style="min-width: 250px; max-width: 300px">
              <q-select
                filled
                v-model="topic"
                single
                :options="topics"
                :option-value="(opt) => opt?.id"
                :option-label="(opt) => opt?.attributes?.name"
                use-chips
                label="Topics"
              />
            </div>
            <q-btn unelevated size="m" class="" label="Search" type="submit" />
          </div>
        </q-form>

        <h5>Search Results</h5>
        <q-list dense bordered padding class="rounded-borders">
          <q-item clickable v-ripple v-for="p in projects" :key="p.id">
            <q-item-section>
              {{ p.attributes.name }}
            </q-item-section>
          </q-item>
        </q-list>
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
    .getProjects(params)
    .then((resp) => setData(resp))
        .catch(function (error) {
          console.log(error);
        });
};

const setData = (response) => {
  setFriends(response.data);
  setProjects(response.data);
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
