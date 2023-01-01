<template lang="">
  <div>
    <div class="q-gutter-md row items-start">
      <EndorsementCard
        v-for="(e, idx) in endorsements"
        :e="e.attributes"
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
import { onMounted } from 'vue';

defineProps({
  endorsements: [EndorsementModel],
});

onMounted(() => {
  // console.log('endorsement list mounted', this.endorsements);
});
</script>
<style lang="scss"></style>
