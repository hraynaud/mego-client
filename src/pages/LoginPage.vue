<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#8274c5, #5a4a9f)"
  >
    <q-card square class="shadow-24" style="width: 300px; height: 485px">
      <q-card-section class="bg-deep-purple-7">
        <h4 class="text-h5 text-white q-my-md">Login</h4>
      </q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-px-sm q-pt-xl q-pb-lg"
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
            color="purple-4"
            class="full-width text-white"
            label="Login"
            type="submit"
          />
        </q-card-actions>
      </q-form>
      <q-card-section class="text-center q-pa-sm">
        <p class="text-grey-6">Forgot Password?</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { Login } from '../core/models';
import { apiService } from '../core/services';
import { authService } from '../core/services';
// import { authService, router } from '../core/services';

export default {
  // setup() {
  //   const $q = useQuasar();

  //   const email = ref(null);
  //   const password = ref(null);

  //   const doLogin = (loginModel: Login) => {
  //     console.log('loggin in?', loginModel);
  //   };

  // function switchToRegister() {
  //   // this.$navigateTo(Registration, {
  //   //   frame: 'root',
  //   //   clearHistory: true,
  //   // });
  // }

  // return {
  //   email,
  //   password,

  //   onSubmit() {
  //     console.log('am I here?');

  //     if (!email.value || !password.value) {
  //       $q.notify({
  //         color: 'red-4',
  //         textColor: 'white',
  //         icon: 'cloud_done',
  //         message: 'Please provide both a valid email and password.',
  //       });

  //       return;
  //     } else {
  //       const loginModel: Login = {
  //         email: email.value,
  //         password: password.value,
  //       };
  //       doLogin(loginModel);
  //     }
  //   },

  //   onReset() {
  //     email.value = null;
  //     password.value = null;
  //   },
  // };

  setup() {
    const $q = useQuasar();

    const email = ref(null);
    const password = ref(null);

    const doLogin = (loginModel: Login) => {
      authService.login(loginModel.email, loginModel.password);
      console.log('loggin in?', loginModel);
    };

    if (process.env.DEV) {
      console.log(`!!! Base url: ${process.env.BASE_URL}`);
    }

    return {
      email,
      password,

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
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
          });
        }
      },

      onReset() {
        email.value = null;
        password.value = null;
      },
    };
  },

  // },
};
</script>

<!-- <script>
import { authService, router } from "../_services";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      loading: false,
      returnUrl: "",
      error: ""
    };
  },
  created() {
    // log out user for now if navigations ends up on this page.
    authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  methods: {
    handleSubmit(e) {
      this.submitted = true;
      const { email, password } = this;

      if (!(email && password)) {
        return;
      }

      this.loading = true;
      authService
        .login(email, password)
        .then(() => {
          this.loading = false;
          return router.push(this.returnUrl);
        })
        .catch(error => {
          this.error = error.message;
          this.loading = false;
        });
    }
  }
};
</script> -->
