<template>
  <q-page>
    <div class="q-py-lg q-mt-xs page-banner">
      <h3 class="text-center q-ma-xs">Endorsements</h3>
    </div>
    <!-- <div class="q-pa-md">
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
    </div> -->
    <div class="q-pa-md">
      <EndorsementPathList :endorsements="endorsements" />
    </div>
  </q-page>
</template>

<script setup>
// import { ref } from 'vue';
import EndorsementPathList from '../components/EndorsementPathList.vue';
import { useEndorsementsList } from 'src/composables/use-endorsement-list';
// import { useTopicList } from 'src/composables/use-topic-list';

// const topics = []; //useTopicList();
const { endorsements } = useEndorsementsList();
// const selectedTopic = ref(null);
</script>
<style lang="scss" scoped>
.page-banner {
  background-color: $tertiary;
  h3 {
    font-weight: 200;
  }
}
</style>
