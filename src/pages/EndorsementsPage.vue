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
import { ref } from 'vue';
import { EndorsementPathModel } from 'src/core/models';
const current = ref(1);
let endorsements = ref<EndorsementPathModel[]>();

const gotopage = () => {
  endorsements = useEndorsementsList({ page: current.value });
};
gotopage();
</script>
