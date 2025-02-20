<template>
  <q-input
    outlined
    dense
    :model-value="modelValue"
    @update:model-value="updateValue"
    :label="label"
    :rules="rules"
    lazy-rules="ondemand"
    class="q-py-sm"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: String,
  label: String,
  rules: Array as () => ((val: string) => boolean | string)[],
  customClass: String,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value: string | number | null) => {
  emit('update:modelValue', value);
};
</script>
