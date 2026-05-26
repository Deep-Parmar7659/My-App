import { api } from "./apiClient";

export async function getPosts(signal) {
  const response = await api.get("/posts", {
    signal,
  });
  return response.posts || [];
}
