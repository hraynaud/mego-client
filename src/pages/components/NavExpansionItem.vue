<template>
  <q-expansion-item
    dense
    dense-toggle
    clickable
    v-ripple
    :content-inset-level="0.25"
    :to="route"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar v-if="imgSrc">
          <img :src="imgSrc" />
        </q-avatar>
        <q-icon :name="icon" v-else />
      </q-item-section>
      <q-item-section> {{ label }} </q-item-section>
    </template>
    <slot></slot>
  </q-expansion-item>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string;
  route?: string;
  label: string;
  imgSrc?: string;
}>();
</script>
