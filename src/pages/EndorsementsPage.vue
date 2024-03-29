<template>
  <q-page>
    <page-header>Endorsements</page-header>

    <div class="q-pa-md">
      <EndorsementPathList :endorsements="endorsements" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import EndorsementPathList from '../components/EndorsementPathList.vue';
import { useEndorsementsList } from 'src/composables/use-endorsement-list';
import PageHeader from '../components/PageHeader.vue';
const { endorsements } = useEndorsementsList();
</script>
