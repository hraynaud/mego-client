import { http } from 'boot/axios';
import { Method } from 'axios';

async function post(path: string, payload: unknown) {
  return await execute('POST', path, payload, {});
}

function get(path: string, params = {}) {
  return execute('GET', path, {}, params);
}

function put(path: string, payload: Record<string, unknown>, params: unknown) {
  return execute('PUT', path, stringify(payload), params);
}

//the word 'delete 'is a js operator
function del(path: string, id: number | string) {
  return execute('DELETE', `${path}/${id}`, null, null);
}

async function execute(
  method: Method,
  path: string,
  payload: unknown | null,
  params: unknown
) {
  try {
    return await http.request({
      method: method,
      data: payload,
      params: params,
      url: path,
    });
  } catch (error) {
    return errHandler(error);
  }
}

/*

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
  console.log('!!!error occurred', msg);
  return Promise.reject(msg);
}

export const apiService = {
  post,
  get,
  del,
  put,
  setHeader,
  getHeader,
};
