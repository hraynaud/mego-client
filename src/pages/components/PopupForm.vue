<template>
  <q-card class="form-card" style="width: 325px">
    <q-card-section class="header q-px-none q-py-sm">
      <div class="q-pl-md">
        <q-avatar :icon="data.icon" class="icon1" />

        <span class="q-ml-lg">{{ data.header }}</span>
      </div>
    </q-card-section>
    <q-card-section>
      <q-form ref="formRef">
        <slot />
      </q-form>
      <q-card-actions align="right">
        <q-btn
          label="Done"
          color="primary"
          @click="validateAndSubmit"
          flat
          no-caps
        />
        <q-btn label="Cancel" color="primary" flat v-close-popup no-caps />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustQInput from 'src/pages/components/custom/CustQInput.vue';

export interface HeaderData {
  header: string;
  icon: string;
}

const formRef = ref(null);
const emit = defineEmits(['submit']);

defineProps<{
  data: HeaderData;
  cls?: string;
}>();

const validateAndSubmit = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    emit('submit');
  }
};
</script>
<style lang="scss" scoped>
.form-card {
  border-radius: 8px;
}
.header {
  font-weight: 300;
  font-size: 24px;
  color: white;
  background-color: $secondary;
}

.icon1 {
  width: 40px;
  height: 40px;
  font-size: 90px;
}
</style>
