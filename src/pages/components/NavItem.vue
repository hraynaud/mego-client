<template>
  <q-item clickable :to="route">
    <q-item-section avatar>
      <q-icon :name="icon" />
    </q-item-section>
    <q-item-section> <slot></slot> </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  route: string;
}>();
</script>

<style lang="scss" scoped>
.q-item__section--avatar {
  color: inherit;
  min-width: 0px;
}

.q-item__section--side > .q-icon {
  font-size: 20px;
}

.q-item__section--side {
  padding-right: 14px;
}
</style>
