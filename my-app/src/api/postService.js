import { api } from "./apiClient";

export async function getPosts(signal) {
  return api.get("/posts", {
    signal,
  });
}
