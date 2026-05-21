import { api } from "../api/apiClient";

export function getUsers() {
  return api.get("/users");
}

export function getPosts() {
  return api.get("/posts");
}
