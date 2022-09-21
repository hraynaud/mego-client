<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Endorsements</h3>

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
      <EndorsementList :endorsements="endorsements" />
    </div>
    <q-page-sticky position="bottom-right" :offset="[64, 36]">
      <q-btn fab icon="add" color="accent" to="/endorsements/new" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { endorsementService, jsonResponseHandler } from '../core/services';
import EndorsementList from '../components/EndorsementList.vue';
import { EndorsementModel } from '../core/models';
import { ref, onMounted } from 'vue';

const endorsements = ref([]);

const loadEndorsements = () => {
  console.log('!!!! loading');
  // eslint-disable-next-line quotes
  endorsementService.getEndorsements().then((res) => {
    const data = res.data.data;
    data.map((e) => {
      endorsements.value.push(
        new EndorsementModel(
          e.attributes.description,
          e.attributes.topic,
          e.attributes.topicImage
        )
      );
    });
    console.log(`!!! -> ${JSON.stringify(endorsements.value)}`);
  });
};

const setData = (response) => {
  this.setEndorsements(response.data);
};

const setEndorsements = (jsonResponse) => {
  this.endorsements = this.getSortedData(jsonResponse, 'projects', 'name');
};

const getSortedData = (jsonResponse, data, key) => {
  if (jsonResponse[data])
    return jsonResponseHandler.setSortedData(jsonResponse, data, key);
  else return [];
};

onMounted(() => {
  loadEndorsements();
});
</script>
<style lang="scss" scoped>
.search-filter {
  // min-width: 250px;
  // max-width: 300px;
}
</style>
