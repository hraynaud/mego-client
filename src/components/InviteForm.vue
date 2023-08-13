<template>
  <q-card>
    <q-card-section class="bg-deep-purple-7">
      <h4 class="text-h5 text-white q-my-md">Invite a friend</h4>
    </q-card-section>
    <div class="q-pa-md invite-form">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-px-sm q-pt-md q-pb-lg"
        name="endorsement"
      >
        <div class="q-mt-l q-mb-xl">
          <h6>Contact Info</h6>
          <div class="row justify-between">
            <div class="col-5">
              <q-input v-model="firstName" stack-label label="First Name" />
            </div>
            <div class="col-5">
              <q-input
                class=""
                v-model="lastName"
                stack-label
                label="Last Name"
              />
            </div>
          </div>
          <div class="row q-mt-md">
            <div class="col-12">
              <q-input class="" v-model="email" stack-label label="Email" />
            </div>
          </div>
        </div>

        <div class="row q-py-xl">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import { inviteService } from '../core/services';
import { InviteFormModel } from '../core/models';

const firstName = ref();
const lastName = ref();
const email = ref();

function onSubmit() {
  const inviteForm: InviteFormModel = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };
  console.log(inviteForm);
  const invite = inviteService.create(inviteForm);
  console.log(invite);
}

onMounted(() => {
  //
});

function onReset() {
  clearNewContact();
}

function clearNewContact() {
  firstName.value = null;
  lastName.value = null;
  email.value = null;
}
</script>
<style scoped lang="scss">
.invite-form {
}
</style>
