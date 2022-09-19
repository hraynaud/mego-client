<template>
  <q-page>
    <div class="q-pa-md">
      <h3>Endorsements</h3>
    </div>
    <div class="q-pa-md">
      <h5>Search Results</h5>
      <div class="q-gutter-md row items-start">
        <q-card
          class="endorsement-card"
          v-for="e in endorsements"
          :key="e.uuid"
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>"{{ e.attributes.topic }}"</q-item-label>
              <q-item-label caption>Subhead</q-item-label>
            </q-item-section>
          </q-item>

          <img
            :src="`http://localhost:9000/public/images/${e.attributes.topicImage}`"
          />

          <q-card-section>
            {{ e.attributes.description }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { apiService, endorsementService } from '../core/services';
import { jsonResponseHandler } from '../core/services';
import { ref, onMounted } from 'vue';

const endorsements = ref([]);

const loadEndorsements = () => {
  // eslint-disable-next-line quotes
  endorsementService.getEndorsements().then((res) => {
    const data = res.data.data;
    data.map((endorsement) => {
      endorsements.value.push(endorsement);
    });
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
.endorsement-card {
  width: 100%;
  max-width: 250px;
}
.search-filter {
  // min-width: 250px;
  // max-width: 300px;
}
</style>
