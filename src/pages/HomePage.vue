<template>
  <div>
    <q-page>
      <div class="q-pa-md">
        <h5>Endorsements</h5>
        <EndorsementList :endorsements="endorsements" />
      </div>
      <q-page-sticky position="bottom-right" :offset="[64, 36]">
        <q-btn fab icon="add" color="accent" to="/endorsements/new" />
      </q-page-sticky>
    </q-page>
  </div>
</template>

<script setup>
import EndorsementList from '../components/EndorsementList.vue';
import { useEndorsementsList } from 'src/composables/use-endorsement-list';

const { endorsements } = useEndorsementsList();
</script>
