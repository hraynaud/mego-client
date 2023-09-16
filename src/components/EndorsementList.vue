<template lang="">
  <div class="q-gutter-md row">
    <EndorsementCard
      v-for="(e, idx) in endorsements"
      :e="e"
      :idx="idx"
      :eid="e.id"
      :key="e.id"
      :displayType="displayType"
      :deleteable="deleteable"
    />
  </div>
</template>
<script setup lang="ts">
import { EndorsementModel } from '../core/models';
import EndorsementCard from '../components/EndorsementCard.vue';
import { endorsementService } from 'src/core/services';
// import bus from '../core/utils/event-bus';
import { useQuasar } from 'quasar';
import { inject } from 'vue';

const $q = useQuasar();
const bus = inject('bus');
const props = defineProps({
  endorsements: [EndorsementModel],
  currentUserContext: String,
  displayType: String,
  deleteable: Boolean,
});

bus.once('delete-endorsement', (endorsement: EndorsementModel) => {
  console.log('delete caught');
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this endorsement homie?',
    cancel: true,
    persistent: false,
  })
    .onOk(() => {
      // doOk();
    })
    .onOk(() => {
      // doOk();
    })
    .onCancel(() => {
      console.log('cancel called');
    })
    .onDismiss(() => {
      console.log('I am triggered on both OK and Cancel');
    });
});
</script>
<style lang="scss"></style>
