import { api } from "./apiClient";

export async function getUsers(signal) {
  const data = await api.get("/users", { signal });
  // dummyjson returns { users: [...] }
  return data.users ?? data;
}

export async function searchUsers(search, signal) {
  const data = await api.get(`/users/search?q=${search}`, { signal });
  // dummyjson returns { users: [...] }
  return data.users ?? data;
}
