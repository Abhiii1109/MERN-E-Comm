const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('luxe_token');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    let errorData;
    try { errorData = await response.json(); } catch { errorData = {}; }
    throw new ApiError(
      errorData.message || `HTTP ${response.status}`,
      response.status,
      errorData
    );
  }

  // Handle 204 No Content
  if (response.status === 204) return null;

  return response.json();
}

export const api = {
  get:    (url, opts = {})  => request(url, { method: 'GET', ...opts }),
  post:   (url, body, opts) => request(url, { method: 'POST', body, ...opts }),
  put:    (url, body, opts) => request(url, { method: 'PUT', body, ...opts }),
  patch:  (url, body, opts) => request(url, { method: 'PATCH', body, ...opts }),
  delete: (url, opts = {})  => request(url, { method: 'DELETE', ...opts }),
};

export { ApiError };
