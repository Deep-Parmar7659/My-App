import { apiClient } from "./apiClient";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers() {
  return apiClient(BASE_URL);
}
