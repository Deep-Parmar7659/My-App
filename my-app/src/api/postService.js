import { api } from "./apiClient";

// Get Posts With Pagination
export async function getPosts(skip = 0, signal) {
  const response = await api.get(`/posts?limit=10&skip=${skip}`, {
    signal,
  });

  return response;
}
