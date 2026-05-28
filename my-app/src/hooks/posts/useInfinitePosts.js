import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/postService";

export default function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["infinite-posts"],
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0, signal }) => {
      const response = await getPosts(pageParam, signal);

      // Safe fallback
      return {
        posts: response?.posts || [],
        total: response?.total || 0,
        skip: response?.skip || 0,
        limit: response?.limit || 10,
      };
    },

    getNextPageParam: (lastPage, allPages = []) => {
      // Safety checks
      if (!lastPage || !Array.isArray(lastPage.posts)) {
        return undefined;
      }
      const nextSkip = allPages.length * 10;
      if (nextSkip >= lastPage.total) {
        return undefined;
      }
      return nextSkip;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}
