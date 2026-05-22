import { api } from "./apiClient";

export async function getUsers(signal) {
  return api.get("/users", {
    signal,
  });
}
