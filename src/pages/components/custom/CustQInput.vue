<template>
  <q-input outlined dense :model-value="modelValue" @update:model-value="updateValue" :label="label" :rules="rules"
    lazy-rules="ondemand" class="q-py-sm" :class="customClass" />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { BaseProps } from 'src/composables/use-form-model-binding';

defineProps<BaseProps>();
const emit = defineEmits(['update:modelValue']);
const updateValue = (value: string | number | null) => {
  emit('update:modelValue', value);
};


</script>
