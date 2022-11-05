import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
const { sessionStorage } = window;
import { SESSION_AUTH_KEY } from '../core/models/constants';
import { authService } from '../core/services';
import { config } from 'process';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const http = axios.create({
  baseURL: process.env.BASE_URL,

  headers: {
    'Content-Type': 'application/json',
    Authorization: sessionStorage.getItem(SESSION_AUTH_KEY),
  },
});

http.interceptors.request.use(
  function (config) {
    config.url = apiUrl(config.url!);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const apiUrl = (url: string) =>
  authService.isLoggedIn() ? `/api/v1${url}` : url;

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = http;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { http };
