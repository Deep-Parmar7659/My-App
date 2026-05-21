const BASE_URL = "https://dummyjson.com";

async function request(endpoint, options = {}) {
  const { method = "GET", body, headers = {}, signal } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export const api = {
  get: (url, options) =>
    request(url, {
      ...options,
      method: "GET",
    }),

  post: (url, body, options) =>
    request(url, {
      ...options,
      method: "POST",
      body,
    }),

  put: (url, body, options) =>
    request(url, {
      ...options,
      method: "PUT",
      body,
    }),

  delete: (url, options) =>
    request(url, {
      ...options,
      method: "DELETE",
    }),
};
