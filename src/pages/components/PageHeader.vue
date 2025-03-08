<template>

  <q-card-section class="q-py-md q-mt-xs page-banner">
    <q-item>
      <q-item-section class="description">
        <h3 class="text-center q-ma-xs">
          <slot></slot>
        </h3>
      </q-item-section>
      <q-item-section avatar>
        <q-avatar icon="assignment_add" class="avatar large icon project" />
      </q-item-section>
    </q-item>
  </q-card-section>
</template>

<script setup lang="ts">
defineProps<{
  cls?: string;
  icon?: string;
}>();
</script>
