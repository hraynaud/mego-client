<template>
  <q-card class="form-card" style="width: 325px">
    <q-card-section class="header q-px-none q-py-sm">
      <div class="q-pl-md">
        <q-avatar icon="contact_page" class="icon1" />

        <span class="q-ml-lg">Add Contact</span>
      </div>
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
import UserAvatar, { AvatarData } from './UserAvatar.vue';

const formRef = ref(null);
const emit = defineEmits(['submit']);
const avatarData: AvatarData = {
  imgUrl: undefined,
  isVisible: false,
  icon: 'contact_page',
  role: undefined,
  tooltip: false,
};

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
<style lang="scss" scoped>
.form-card {
  border-radius: 8px;
}
.header {
  font-weight: 300;
  font-size: 2.125em;
  color: white;
  background-color: $secondary;
}
.anon {
  // background-color: $tertiary;
  // color: white;
  // font-weight: bold;
}
.icon1 {
  // border: 1px solid;
  // border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 90px;
}
</style>
