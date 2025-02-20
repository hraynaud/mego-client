<template>
  <q-card class="" style="width: 325px">
    <q-card-section>
      <h5 class="text-center">Add a Contact</h5>
    </q-card-section>
    <q-card-section>
      <q-form ref="formRef">
        <CustQInput
          v-model="newContact.firstName"
          label="First Name"
          :rules="[(val) => !!val || 'First name is required']"
        />

        <CustQInput
          v-model="newContact.lastName"
          label="Last Name"
          :rules="[(val) => !!val || 'Last name is required']"
        />

        <CustQInput
          v-model="newContact.email"
          label="Email"
          :rules="[
            (val) => !!val || 'Email is required',
            (val) => /.+@.+\..+/.test(val) || 'Enter a valid email',
          ]"
        />
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
import { PersonFormModel } from 'src/core/models';
import { defineModel, ref } from 'vue';
import CustQInput from 'src/components/custom/CustQInput.vue';

const formRef = ref(null);
const emit = defineEmits(['submit']);

const newContact = defineModel<PersonFormModel>({
  default: () => ({}),
});

const validateAndSubmit = async () => {
  const isValid = await formRef.value?.validate();
  if (isValid) {
    emit('submit');
  }
};
</script>
