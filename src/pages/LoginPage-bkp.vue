<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-card square class="shadow-24">
      <q-card-section class="bg-deep-purple-7">
        <h4 class="text-h5 text-white q-my-md">Login</h4>
      </q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-px-sm q-pt-m q-pb-lg"
      >
        <q-card-section>
          <q-input square clearable v-model="email" type="email" label="Email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="password"
            type="password"
            label="Password"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions class="q-px-lg">
          <q-btn
            unelevated
            size="lg"
            class="full-width text-primary"
            label="Login"
            type="submit"
          />
          <q-card-section class="text-center q-pa-sm">
            <router-link class="text-grey-6" to="signup">Sign Up</router-link>
          </q-card-section>
          <q-card-section class="text-center q-pa-sm">
            <router-link class="text-grey-6" to="signup"
              >Forgot Password?</router-link
            >
          </q-card-section>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Login } from '../core/models';
import { authService } from '../core/services';

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    let submitted = false;
    let loading = false;
    let returnUrl = '';
    let error = '';

    const doLogin = (loginModel: Login) => {
      loading = true;
      authService
        .login(loginModel.email, loginModel.password)
        .then(() => {
          loading = false;
          router.replace('/');
        })
        .catch((err) => {
          error = err.message;
          console.log('error:', error);
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: error,
          });
        });
    };

    return {
      email,
      password,
      submitted,
      loading,
      returnUrl,
      error,

      onSubmit() {
        if (!email.value || !password.value) {
          $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'please enter email and password',
          });
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
