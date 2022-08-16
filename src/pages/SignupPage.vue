<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <q-card square class="shadow-24" style="width: 300px; height: 485px">
      <q-card-section class="bg-deep-purple-7">
        <h4 class="text-h5 text-white q-my-md">Registration</h4>
      </q-card-section>
      <q-card-section>
        <q-form class="q-px-sm q-pt-xl q-pb-lg">
          <q-input square clearable v-model="email" type="email" label="Email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <!-- <q-input
            square
            clearable
            v-model="username"
            type="username"
            label="Username"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input> -->
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
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-lg">
        <q-btn
          unelevated
          size="lg"
          color="purple-4"
          class="full-width text-white"
          label="Get Started"
        />
      </q-card-actions>
      <!-- <q-card-section class="text-center q-pa-sm">
        <p class="text-grey-6">Return to login</p>
      </q-card-section> -->
    </q-card>
  </q-page>
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
