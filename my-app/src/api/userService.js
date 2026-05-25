import { api } from "./apiClient";

export async function getUsers(signal) {
  return api.get("/users", { signal });
}

export async function searchUsers(query, signal) {
  return api.get(`/users/search?q=${query}`, { signal });
}
