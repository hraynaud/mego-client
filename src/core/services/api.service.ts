import { http } from 'boot/axios';
import { Method } from 'axios';
import { AxiosResponse } from 'axios';
import { API_PREFIX, SESSION_AUTH_KEY } from '../../core/models/constants';
import { authService } from './auth.service';

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

const extractReponseData = (resp: AxiosResponse<any>) => {
  return resp.data.data;
};

const resolveApiPrefix = (url: string) => {
  return authService.isLoggedIn() ? `${API_PREFIX}${url}` : url;
};

export interface StreamOptions {
  onChunk: (chunk: string) => void;
  onComplete?: () => void;
  onError?: (error: Event) => void;
}

const sendStream = (message: string, opts: StreamOptions): EventSource => {
  // Get the auth token
  const authToken = sessionStorage.getItem(SESSION_AUTH_KEY);

  // Use the same URL formatting as your axios interceptor would
  let url = `/chat/stream?message=${encodeURIComponent(message)}`;
  url = resolveApiPrefix(url); // Apply the same URL transformation as axios

  // Add auth token as a query parameter since EventSource doesn't support custom headers
  if (authToken) {
    url += `&authorization=${encodeURIComponent(authToken)}`;
  }

  // Create a new SSE connection
  const eventSource = new EventSource(`${process.env.SERVER_URL}${url}`);

  // Handle message chunks
  eventSource.onmessage = (event: MessageEvent) => {
    const chunk = JSON.parse(event.data);
    opts.onChunk(chunk.data);
  };

  // Handle completion (when connection is closed by server)
  eventSource.addEventListener('complete', () => {
    eventSource.close();
    if (opts.onComplete) opts.onComplete();
  });

  // Handle errors
  eventSource.onerror = (error: Event) => {
    console.error('EventSource encountered an error:', error);
    eventSource.close();
    if (opts.onError) opts.onError(error);
  };

  return eventSource;
};

export const apiService = {
  post,
  get,
  del,
  put,
  setHeader,
  getHeader,
  extractReponseData,
  sendStream,
  resolveApiPrefix,
};
