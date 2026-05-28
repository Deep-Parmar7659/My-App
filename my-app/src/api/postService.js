import { api } from "./apiClient";

// Get Posts With Pagination
export async function getPosts(pageParam = 0, signal) {
  const response = await api.get(`/posts?limit=10&skip=${pageParam}`, {
    signal,
  });

  // MUST return full response
  return response;
}
