<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Endorsements</h3>

      <q-form @submit.prevent="onSubmit">
        <div class="row items-baseline justify-start q-gutter-lg">
          <label>Filter:</label>
          <!-- <div class="col-2 search-filter">
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
        -->
          <div class="col-4 search-filter">
            <q-select
              v-model="selectedTopic"
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
      <EndorsementList :endorsements="endorsements" deleteable="false" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[64, 36]">
      <q-btn fab icon="add" color="accent" to="/endorsements/new" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import EndorsementList from '../components/EndorsementList.vue';
import { useEndorsementsList } from 'src/composables/use-endorsement-list';
// import { useTopicList } from 'src/composables/use-topic-list';

const topics = []; //useTopicList();
const { endorsements } = useEndorsementsList();
const selectedTopic = ref(null);
</script>
<style lang="scss" scoped>
.search-filter {
  // min-width: 250px;
  // max-width: 300px;
}
</style>
