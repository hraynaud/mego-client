<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div style="background-image: url('../../src/assets/login/bg-2.png'); width: 100%; height: inherit;display: grid;">
      <div class="q-my-lg" style="width: 300px;  text-align: center; place-self: center;">
        <q-form @submit="onSubmit" @reset="onReset" class="q-px-sm q-pt-m q-pb-lg">
          <q-card class="q-py-lg">

            <q-card-section class="q-mb-sm">
              <div>Create an account:</div>
              <q-input outlined dense clearable v-model="email" type="email" label="Email" class="q-mb-md" />
              <q-input outlined dense clearable v-model="password" type="password" label="Password" class="q-mb-md" />
              <q-input outlined dense clearable v-model="passwordConfirmation" type="password"
                label="Password Confirmation" />

              <q-input square clearable v-model="inviteCode" type="text" readonly label="Invite Code"
                v-if="inviteCode" />

            </q-card-section>
            <div class="divider">
              <span>OR</span>
            </div>
            <q-card-section>
              <q-btn class="q-my-xs full-width" color="white" no-caps outline text-color="black" align="center">
                <q-icon name="img:https://hr-test-knowbuddyz.s3.us-east-1.amazonaws.com/Google.svg" left
                  size="16px"></q-icon>
                <div class="text-weight-light">Continue with Google</div>
              </q-btn>

            </q-card-section>



            <q-card-section class="">
              <q-btn color="black" class="full-width" :ripple="false" label="Discover your community!" type="submit"
                no-caps />
            </q-card-section>

            <span class="text-weight-light">
              Already a member?
              <router-link class="text-weight-regular" to="/auth/login">Login
              </router-link></span>
          </q-card>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { ref, onMounted } from 'vue';
import { authService } from '../core/services';
import { useRouter, useRoute } from 'vue-router';

// export default {
// setup() {
const $q = useQuasar();
const router = useRouter();
const curRoute = useRoute();
const email = ref<string>('');
const password = ref<string>('');
const passwordConfirmation = ref<string>('');
const inviteCode = ref<string | undefined>(undefined);
let error = '';

onMounted(() => {
  console.log(JSON.stringify(curRoute));
});

function onSubmit() {

  authService
    .signup(
      email.value,
      password.value,
      inviteCode.value
    )
    .then(() => {
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
}

function onReset() {
  email.value = '';
  password.value = '';
  passwordConfirmation.value = '';
}
</script>
