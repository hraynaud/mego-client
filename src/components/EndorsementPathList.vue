<template>
  <div class="q-gutter-md row">
    <EndorsementPathCard
      v-for="(e, idx) in endorsements"
      :e="e"
      :idx="idx"
      :eid="e.id"
      :key="e.id"
    />
  </div>
</template>
<script setup lang="ts">
import { EndorsementPathModel } from '../core/models';
import EndorsementPathCard from '../components/EndorsementPathCard.vue';

defineProps<{
  endorsements: EndorsementPathModel[];
}>();
</script>
