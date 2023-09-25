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
      <EndorsementPathList :endorsements="endorsements" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import EndorsementPathList from '../components/EndorsementPathList.vue';
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
