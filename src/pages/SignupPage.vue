<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <q-card square class="shadow-24" style="width: 300px">
      <q-card-section class="bg-deep-purple-7">
        <h4 class="text-h5 text-white q-my-md">Sign Up</h4>
      </q-card-section>
      <q-form @submit="onSubmit" @reset="onReset">
        <q-card-section class="q-px-sm q-pt-m q-pb-l">
          <q-input
            square
            clearable
            v-model="firstName"
            type="text"
            label="First Name"
          >
            <template v-slot:prepend>
              <q-icon name="name" />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="lastName"
            type="text"
            label="Last Name"
          >
            <template v-slot:prepend>
              <q-icon name="name" />
            </template>
          </q-input>
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
          <q-input
            square
            clearable
            v-model="passwordConfirmation"
            type="password"
            label="Password Confirmation"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
          </q-input>

          <q-input
            square
            clearable
            v-model="inviteCode"
            type="text"
            readonly
            label="Invite Code"
            v-if="inviteCode"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="q-px-lg">
          <q-btn
            unelevated
            size="lg"
            color="purple-4"
            class="full-width text-white"
            label="Get Started"
            type="submit"
          />
          <q-card-section class="text-center q-pa-sm">
            <router-link class="text-grey-6" to="signup">Login</router-link>
          </q-card-section>
          <q-card-section class="text-center q-pa-sm">
            <router-link class="text-grey-6" to="signup"
              >Forgot Password?</router-link
            >
          </q-card-section>
        </q-card-actions>
      </q-form>
      <!-- <q-card-section class="text-center q-pa-sm">
        <p class="text-grey-6">Return to login</p>
      </q-card-section> -->
    </q-card>
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

const firstName = ref<string>('');
const lastName = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const passwordConfirmation = ref<string>('');
const inviteCode = ref<string | undefined>(undefined);
let loading = false;
let error = '';

onMounted(() => {
  console.log(JSON.stringify(curRoute));
});

function onSubmit() {
  loading = true;
  authService
    .signup(
      email.value,
      password.value,
      firstName.value,
      lastName.value,
      inviteCode.value
    )
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
}

function onReset() {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  password.value = '';
  passwordConfirmation.value = '';
}
</script>
