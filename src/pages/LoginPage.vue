<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="email"
        filled
        type="email"
        label="email"
        error-message="Please enter a valid email address"
        :rules="['email']"
      />
      <q-input
        filled
        type="password"
        v-model="password"
        label="password"
        lazy-rules
        autocomplete="current-password"
        :rules="[
          (val) =>
            (val !== null && val !== '' && val.length > 8) ||
            'Please enter a valid password',
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
import { Login } from '../core/models';

export default {
  setup() {
    const $q = useQuasar();
    const email = ref(null);
    const password = ref(null);
    const doLogin = (loginModel: Login) => {
      console.log('loggin in?', loginModel);
    };

    // function switchToRegister() {
    //   // this.$navigateTo(Registration, {
    //   //   frame: 'root',
    //   //   clearHistory: true,
    //   // });
    // }

    return {
      email,
      password,

      onSubmit() {
        if (!email.value || !password.value) {
          $q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Please provide both a valid email and password.',
          });

          return;
        } else {
          const loginModel: Login = {
            email: email.value,
            password: password.value,
          };
          doLogin(loginModel);
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },
};
</script>
