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

// Add User
export async function addUser(userData) {
  const response = await api.post("/users/add", userData);
  return response;
}

// Update User
export async function updateUser(id, userData) {
  const response = await api.put(`/users/${id}`, userData);
  return response;
}

// Delete User
export async function deleteUser(id) {
  const response = await api.delete(`/users/${id}`);
  return response;
}
