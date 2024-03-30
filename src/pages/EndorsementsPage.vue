<template>
  <q-page>
    <page-header>Endorsements</page-header>

    <div class="q-pa-md">
      <EndorsementPathList :endorsements="endorsements" />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="current"
        :max="10"
        :boundary-numbers="false"
        @update:model-value="gotopage"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useEndorsementsList } from 'src/composables/use-endorsement-list';
import EndorsementPathList from '../components/EndorsementPathList.vue';

import PageHeader from '../components/PageHeader.vue';
import { Ref, ref } from 'vue';
import { EndorsementPathModel } from 'src/core/models';
const current = ref(1);
const query = ref('Who do I know that knows haute couture');
const topicName = ref('Design');
import { SearchParams } from '../stores/endorsements-store';
let endorsements: Ref<EndorsementPathModel[]> = ref([]);
const seachParams = ref<SearchParams>({
  page: undefined,
  query: undefined,
  topicName: undefined,
});
const gotopage = () => {
  seachParams.value.page = current.value;
  seachParams.value.query = query.value;
  seachParams.value.topicName = topicName.value;
  endorsements = useEndorsementsList(seachParams.value);
};
gotopage();
</script>
