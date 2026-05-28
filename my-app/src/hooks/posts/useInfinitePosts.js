import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../../api/postService";

export default function useInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0, signal }) => getPosts(pageParam, signal),
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      // Safety
      if (!lastPage || !allPages) {
        return undefined;
      }

      // Ensure posts exists
      if (!Array.isArray(lastPage.posts)) {
        return undefined;
      }

      const nextSkip = allPages.length * 10;

      // Stop pagination
      if (nextSkip >= lastPage.total) {
        return undefined;
      }

      return nextSkip;
    },
  });
}
