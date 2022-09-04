import { SESSION_AUTH_KEY } from '../models/constants';

import { http } from 'boot/axios';
import { Method } from 'axios';

function post(path: string, payload = {}) {
  return execute('POST', path, payload);
  // return api.post(path, payload);
}

function get(path: string, params = {}) {
  return execute('GET', path, {}, params);
}

function execute(method: Method, path: string, payload = {}, params = {}) {
  return http
    .request({ method: method, data: payload, params: params, url: path })
    .catch(errHandler);
}

/*

// eslint-disable-next-line no-unused-vars
function put(path, payload, params) {
  return execute('PUT', path, stringify(payload), params);
}

//the word 'delete 'is a js operator
// eslint-disable-next-line no-unused-vars

function del(path, params) {
  return execute('DELETE', path, {}, params);
}
// eslint-disable-next-line no-unused-vars
function patch(path, payload, params) {
  return execute('PATCH', path, stringify(payload), params);
}
*/

function stringify(payload = {}) {
  return { data: JSON.stringify(payload) };
}

function setHeader(hdr: string, val: string) {
  http.defaults.headers.common[hdr] = val;
}

function getHeader(hdr: string) {
  return http.defaults.headers.common[hdr];
}

function errHandler(error: any) {
  let msg;
  if (error.response) {
    msg = error.response.headers['x-message'];
  } else if (error.request) {
    msg = 'Server not responding';
  } else {
    msg = 'Unable to connect to API';
  }
  throw new Error(msg);
}

export const apiService = {
  post,
  get,
  setHeader,
  getHeader,
};
