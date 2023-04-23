<template lang="">
  <div>
    <div class="q-gutter-md row items-start">
      <EndorsementCard
        v-for="(e, idx) in endorsements"
        :e="e"
        :idx="idx"
        :eid="e.id"
        :key="e.id"
      />
    </div>
  </div>
</template>
<script setup>
import { EndorsementModel } from '../core/models';
import EndorsementCard from '../components/EndorsementCard.vue';

defineProps({
  endorsements: [EndorsementModel],
});
</script>
<style lang="scss"></style>
