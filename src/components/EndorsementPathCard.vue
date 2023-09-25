<template>
  <q-card>
    <q-item>
      <q-item-section>
        <q-item-label class="text-h5">{{ e?.topic }}</q-item-label>
        <div
          class="q-py-md round"
          style="height: 80px; min-width: 160px; position: relative"
        >
          <div style="position: relative" v-for="(p, n) in path" :key="p.id">
            <q-avatar
              v-if="p.avatar_url != 'anonymous.png'"
              size="40px"
              class="overlapping"
              :style="`left: ${n * 30}px`"
            >
              <img :src="p.avatar_url" />
            </q-avatar>
            <q-avatar
              v-else
              color="grey "
              size="40px"
              class="overlapping anon"
              :style="`left: ${n * 30}px`"
              >?</q-avatar
            >
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { EndorsementPathModel } from '../core/models';

const props = defineProps({
  e: EndorsementPathModel,
  idx: Number,
});

const path = computed(() => props.e?.path);
</script>

<style lang="sass" scoped>
.overlapping
  border: 2px solid gray
  position: absolute
.anon
  color: white
  font-weight: bold
</style>
