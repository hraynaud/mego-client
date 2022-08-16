import jwt_decode from 'jwt-decode';
import { apiService } from '../services';
import { SESSION_USER_KEY, SESSION_AUTH_KEY } from '../models/constants';
// import { store } from '../store';
const { localStorage, sessionStorage } = window;

export const authService = {
  login,
  logout,
  currentUser,
};

function login(email: string, password: string) {
  return apiService.post('/login', { email, password }).then(handleLogin);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem(SESSION_USER_KEY);
  sessionStorage.removeItem(SESSION_AUTH_KEY);
  // store.dispatch('logout');
}

function currentUser() {
  const val = localStorage.getItem(SESSION_USER_KEY);
  if (val) return JSON.parse(val);
  else return undefined;
}

function handleLogin(response: any) {
  if (response.headers.jwt) {
    signIn(response.headers.jwt);
  } else {
    return Promise.reject(response.error);
  }
}

function signIn(jwt) {
  sessionStorage.setItem(SESSION_AUTH_KEY, jwt);

  //pass the decoded jwt into IIFE then destructue and set user var.
  const user = (({ first, last }) => ({ first, last }))(jwt_decode(jwt));

  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
  // store.dispatch('login');
}
