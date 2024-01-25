<template>
  <div class="q-gutter-md row">
    <EndorsementCard
      v-for="(e, idx) in endorsements"
      :e="e"
      :idx="idx"
      :eid="e.id"
      :key="e.id"
      :role="role"
      :deleteable="deleteable"
    />
  </div>
</template>
<script setup lang="ts">
import { EndorsementModel } from '../core/models';
import EndorsementCard from '../components/EndorsementCard.vue';

defineProps<{
  endorsements: EndorsementModel[];
  currentUserContext: string;
  role: string;
  deleteable: boolean;
}>();
</script>
