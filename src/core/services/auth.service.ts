import jwt_decode from 'jwt-decode';
import { apiService } from '../services';
import { SESSION_USER_KEY, SESSION_AUTH_KEY } from '../models/constants';
// import { store } from '../store';
const { localStorage, sessionStorage } = window;

export const authService = {
  login,
  logout,
  currentUser,
  isLoggedIn,
  isLoggedOut,
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

function isLoggedIn() {
  return !isLoggedOut();
}

function isLoggedOut() {
  return !currentUser() || sessionExpired();
}

function sessionExpired(): boolean {
  const expTs = currentUser().exp * 1000;
  return expTs < Date.now();
}

function handleLogin(response: any) {
  if (response.headers.jwt) {
    return signIn(response.headers.jwt);
  } else {
    return Promise.reject(response.error);
  }
}

function signIn(jwt: string) {
  sessionStorage.setItem(SESSION_AUTH_KEY, jwt);

  //pass the decoded jwt into IIFE then destructue and set user var.
  const user = (({ email, name, exp, uid, avatar }) => ({
    email,
    name,
    exp,
    uid,
    avatar,
  }))(jwt_decode(jwt));

  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
  apiService.setHeader('Authorization', jwt);
  console.log(
    'signed in user with jwt:',
    apiService.getHeader('Authorization')
  );
  // store.dispatch('login');
  return currentUser();
}
