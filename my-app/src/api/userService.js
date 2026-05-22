import { api } from "./apiClient";

export async function getUsers(signal) {
  return api.get("/users", {
    signal,
  });
}

export async function searchUsers(search, signal) {
  return api.get(`/users/search?q=${search}`, {
    signal,
  });
}
