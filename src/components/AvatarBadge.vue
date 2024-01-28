<template>
  <q-badge
    v-if="role == 'endorsee'"
    class="badge"
    color="red"
    text-color="white"
    rounded
    floating
  >
    <span class="check">&#10003;</span>
  </q-badge>
</template>

<script setup lang="ts">
defineProps<{
  role: string | undefined;
}>();
</script>

<style>
.badge {
  width: 16px;
  height: 16px;
  .check {
    position: relative;
    left: -3px;
  }
}
</style>
