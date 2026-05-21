import { api } from "../api/apiClient";

export function getUsers() {
  return api.get("/users");
}

export function getPosts() {
  return api.get("/posts");
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
