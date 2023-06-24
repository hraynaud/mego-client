<template lang="">
  <div>
    <div class="q-gutter-md row items-start">
      <EndorsementCard
        v-for="(e, idx) in endorsements"
        :e="e"
        :idx="idx"
        :eid="e.id"
        :key="e.id"
        :displayType="props.displayType"
      />
    </div>
  </div>
</template>
<script setup>
import { EndorsementModel } from '../core/models';
import EndorsementCard from '../components/EndorsementCard.vue';

const props = defineProps({
  endorsements: [EndorsementModel],
  currentUserContext: String,
  displayType: String,
});
</script>
<style lang="scss"></style>
