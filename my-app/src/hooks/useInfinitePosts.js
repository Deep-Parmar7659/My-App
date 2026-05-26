import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../api/postService";

export default function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0, signal }) => getPosts(pageParam, signal),

    // Next page logic
    getNextPageParam: (lastPage, allPages) => {
      const nextSkip = allPages.length * 10;
      // Stop if no more posts
      if (nextSkip >= lastPage.total) {
        return undefined;
      }
      return nextSkip;
    },
    initialPageParam: 0,
  });
}
