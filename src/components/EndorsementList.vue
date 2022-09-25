<template lang="">
  <div>
    <div class="q-gutter-md row items-start">
      <EndorsementCard v-for="e in endorsements" :e="e" :key="e.description" />
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
  console.log('endorsement list mounted');
});
</script>
<style lang="scss"></style>
