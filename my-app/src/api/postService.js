import { api } from "./apiClient";

// Get Posts With Pagination
export async function getPosts(pageParam = 0, signal) {
  const response = await api.get(`/posts?limit=10&skip=${pageParam}`, {
    signal,
  });

  return response;
}

// Get Single Post
export async function getPost(id, signal) {
  return api.get(`/posts/${id}`, {
    signal,
  });
}
