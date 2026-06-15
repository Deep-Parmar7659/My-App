import { api } from "./apiClient";

export async function getPosts(pageParam = 0, signal) {
  console.log("pageParam:", pageParam);
  console.log("signal:", signal);

  const response = await api.get(`/posts?limit=10&skip=${pageParam}`, {
    signal,
  });

  return response;
}
