<template>
  <PopupForm :data="headerData">
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
  </PopupForm>
</template>

<script setup lang="ts">
import { PersonFormModel } from 'src/core/models';
import { defineModel } from 'vue';
import PopupForm, { HeaderData } from 'src/pages/components/PopupForm.vue';
import CustQInput from 'src/pages/components/custom/CustQInput.vue';

const newContact = defineModel<PersonFormModel>({
  default: () => ({}),
});

const headerData: HeaderData = {
  icon: 'contact_page',
  header: 'Add Contact',
};
</script>
