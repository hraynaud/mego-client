<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="login"
        label="email *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="password *"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '' && val.length > 8) ||
            'Please enter password',
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="passwordConfirmation"
        label="password confirmation"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '' && val.length > 8) ||
            'Please enter password',
        ]"
      />

      <div>
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
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

export default {
  setup() {
    const $q = useQuasar();

    const login = ref(null);
    const password = ref(null);
    const passwordConfirmation = ref(null);

    return {
      login,
      password,
      passwordConfirmation,

      onSubmit() {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted',
        });
      },

      onReset() {
        login.value = null;
        password.value = null;
        passwordConfirmation.value = null;
      },
    };
  },
};
</script>
