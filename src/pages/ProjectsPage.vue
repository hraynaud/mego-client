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

<script>
import { apiService } from '../core/services';
import { jsonResponseHandler } from '../core/services';
export default {
  data() {
    return {
      friend: null,
      topic: null,
      friends: [],
      topics: [],
      projects: [],
      selectedFriends: [],
      selectedTopics: [],
    };
  },

  methods: {
    onSubmit(e) {
      this.submitted = true;
      console.log('form submitted');
      this.loadProjects()
        .then((response) => this.setProjects(response.data))
        .catch(function (error) {
          console.log(error);
        });
    },
    loadProjects() {
      const { friend, topic } = this;
      const friendId = friend?.id;
      const topicId = topic?.id;
      // eslint-disable-next-line quotes
      return apiService.post('api/v1/projects/search', {
        friend: friendId,
        topic: topicId,
      });
    },

    setData(response) {
      this.setFriends(response.data);
      this.setProjects(response.data);
      this.setTopics(response.data);
    },

    setProjects(jsonResponse) {
      this.projects = this.getSortedData(jsonResponse, 'projects', 'name');
    },

    setFriends(jsonResponse) {
      this.friends = this.getSortedData(jsonResponse, 'friends', 'firstName');
    },

    setTopics(jsonResponse) {
      this.topics = this.getSortedData(jsonResponse, 'topics', 'name');
    },
    getSortedData(jsonResponse, data, key) {
      if (jsonResponse[data])
        return jsonResponseHandler.setSortedData(jsonResponse, data, key);
      else return [];
    },
  },

  beforeRouteEnter: function (to, from, next) {
    console.log('loading projects');
    next((vm) =>
      vm
        .loadProjects()
        .then(function (response) {
          vm.setData(response);
        })
        .catch(function (error) {
          console.log(error);
          vm.$router.push('/error');
        })
    );
  },
};
</script>
