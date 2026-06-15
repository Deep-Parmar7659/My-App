import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../api/postService";

export default function usePost(id) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: ({ signal }) => getPost(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
