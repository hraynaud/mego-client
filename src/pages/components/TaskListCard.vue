<template>
  <q-card>
    <q-card-section>{{ header }}</q-card-section>
    <q-card-section>
      <q-list separator>
        <q-expansion-item v-for="item in items" :key="item" :label="item" :icon="icon" :class="cls">
          {{ item }}
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  header: string;
  cls: string;
  icon: string;
  items: string[]
}>()
</script>
