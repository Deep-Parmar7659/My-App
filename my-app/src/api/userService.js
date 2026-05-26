import { api } from "./apiClient";

export async function getUsers(signal) {
  const response = await api.get("/users", {
    signal,
  });
  return response.users || [];
}

export async function searchUsers(query, signal) {
  const response = await api.get(`/users/search?q=${query}`, {
    signal,
  });
  return response.users || [];
}
