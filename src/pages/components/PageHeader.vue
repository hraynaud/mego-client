<template>
  <div class="q-py-lg q-mt-xs page-banner" :class="cls">
    <h3 class="text-center q-ma-xs"><slot></slot></h3>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  cls?: string;
}>();
</script>

<style>
.avatar-left-large {
  padding-left: 125px;
}
</style>
