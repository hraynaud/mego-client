<template>
  <q-select :model-value="modelValue" @update:model-value="updateValue" class="q-py-sm" dense single outlined
    :options="options" :label="label">
  </q-select>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { BaseProps } from 'src/composables/use-form-model-binding';

defineProps<BaseProps & { options: string[] }>();
const emit = defineEmits(['update:modelValue']);
const updateValue = (value: string | number | null) => {
  emit('update:modelValue', value);
};
</script>
