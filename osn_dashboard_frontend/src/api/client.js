import { getEnv } from '../hooks/useEnv';
import { log } from '../utils/logger';

/**
 * Simple fetch-based API client that prefixes base URL and handles JSON/multipart.
 */
class ApiClient {
  constructor() {
    const { apiBase } = getEnv();
    this.base = apiBase || '';
  }

  // PUBLIC_INTERFACE
  async get(path, options = {}) {
    /** GET request wrapper */
    return this._request('GET', path, null, options);
  }

  // PUBLIC_INTERFACE
  async post(path, data, options = {}) {
    /** POST request wrapper */
    return this._request('POST', path, data, options);
  }

  // PUBLIC_INTERFACE
  async patch(path, data, options = {}) {
    /** PATCH request wrapper */
    return this._request('PATCH', path, data, options);
  }

  // PUBLIC_INTERFACE
  async delete(path, options = {}) {
    /** DELETE request wrapper */
    return this._request('DELETE', path, null, options);
  }

  async _request(method, path, data, options) {
    const url = `${this.base}${path}`;
    const headers = new Headers(options.headers || {});
    const isMultipart = data instanceof FormData;
    if (!isMultipart) {
      headers.set('Content-Type', 'application/json');
    }
    const init = {
      method,
      headers,
      credentials: 'include',
    };
    if (data !== null && data !== undefined) {
      init.body = isMultipart ? data : JSON.stringify(data);
    }

    log.debug('API', method, url);
    const res = await fetch(url, init);
    const text = await res.text();
    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (e) {
      // keep raw text for non-JSON
    }
    if (!res.ok) {
      const err = new Error((json && (json.message || json.error)) || `HTTP ${res.status}`);
      err.status = res.status;
      err.payload = json || text;
      throw err;
    }
    return json;
  }
}

export const apiClient = new ApiClient();
export default apiClient;
