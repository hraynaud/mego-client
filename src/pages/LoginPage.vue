<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div
      class="q-my-lg"
      style="max-width: 300px; min-height: 100vh; text-align: center"
    >
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-px-sm q-pt-m q-pb-lg"
      >
        <q-card class="q-py-lg">
          <q-card-section class="">
            <q-btn
              class="q-my-sm full-width"
              color="white"
              no-caps
              outline
              text-color="black"
              align="center"
            >
              <q-icon
                name="img:https://hr-test-knowbuddyz.s3.us-east-1.amazonaws.com/Google.svg"
                left
                size="16px"
              ></q-icon>
              <div class="text-weight-light">Log in with Google</div>
            </q-btn>
            <q-btn
              class="q-my-sm full-width"
              color="white"
              :ripple="false"
              no-caps
              outline
              text-color="black"
              align="center"
            >
              <q-icon
                name="email"
                left
                color="grey-14"
                style="font-size: 20px; margin-left: -8px"
              ></q-icon>
              <div class="text-weight-light">Log in with Email</div>
            </q-btn>
          </q-card-section>

          <div class="divider">
            <span>OR</span>
          </div>

          <q-card-section class="q-mb-md">
            <q-input
              outlined
              dense
              clearable
              v-model="email"
              type="email"
              label="Email"
              class="q-mb-md"
            ></q-input>
            <q-input
              outlined
              dense
              clearable
              v-model="password"
              type="password"
              label="Password"
            ></q-input>
            <router-link
              class="block q-mt-md text-right text-weight-light"
              to="/forgot-password"
              >Forgot password?
            </router-link>
          </q-card-section>

          <q-card-section class="">
            <q-btn
              color="black"
              class="full-width"
              :ripple="false"
              label="Log in"
              type="submit"
              no-caps
            />
          </q-card-section>

          <span class="text-weight-light">
            Don't have an account?
            <router-link class="text-weight-regular" to="/forgot-password"
              >Sign Up
            </router-link></span
          >
        </q-card>
      </q-form>
    </div>
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
<style>
.q-btn--outline::before {
  border: 1px solid #ecf0f5;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: #6c7480; /* Adjust for correct shade */
  font-weight: bold;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d3d8e0; /* Adjust for correct shade */
  margin: 0 10px; /* Adjust spacing */
}

.text-m {
  color: #a2aa33 !important;
}
</style>
