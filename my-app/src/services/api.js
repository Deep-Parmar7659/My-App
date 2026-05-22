import { api } from "../api/apiClient";

export async function getUsers(signal) {
  const data = await api.get("/users", { signal });
  // dummyjson returns { users: [...], total, skip, limit }
  return data.users ?? data;
}

export async function getPosts(signal) {
  const data = await api.get("/posts", { signal });
  // dummyjson returns { posts: [...], total, skip, limit }
  return data.posts ?? data;
}

export function createUser(userData) {
  // for add new data to server
  return api.post("/users", userData);
}

export function updateUser(id, userData) {
  // for update existing data on server
  return api.put(`/users/${id}`, userData);
}

export function deleteUser(id) {
  // for delete existing data on server
  return api.delete(`/users/${id}`);
}
