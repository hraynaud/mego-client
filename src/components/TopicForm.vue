<template>
  <q-card style="width: 400px">
    <q-card-section>
      <h5 class="q-my-md text-center">Add a Topic</h5>
    </q-card-section>

    <q-card-section>
      <q-form ref="formRef">
        <CustQInput
          v-model="topic.name"
          label="Name"
          :rules="[(val) => !!val || 'First name is required']"
        />
        <CustQInput
          v-model="topic.description"
          type="textarea"
          label="Description"
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter an description',
          ]"
        />
      </q-form>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        label="Done"
        flat
        color="primary"
        @click="validateAndSubmit"
        no-caps
      />
      <q-btn label="Cancel" color="primary" flat v-close-popup no-caps />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { defineModel, ref } from 'vue';
import { TopicFormModel } from '../core/models';
import CustQInput from 'src/components/custom/CustQInput.vue';

const formRef = ref(null);
const emit = defineEmits(['submit']);

const topic = defineModel<TopicFormModel>({
  default: () => ({}),
});

const validateAndSubmit = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    emit('submit'); // Close the dialog
  }
};
</script>
