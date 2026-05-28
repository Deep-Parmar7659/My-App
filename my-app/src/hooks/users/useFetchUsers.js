import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../api/userService";

export default function useFetchUsers() {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const normalizedUsers = data.map((user) => ({
    id: user.id,
    name: user.name || `${user.firstName ?? ""} ${user.lastName ?? ""}`,
    email: user.email,
    age: user.age,
    company:
      typeof user.company === "object" ? user.company : { name: user.company },
  }));

  return {
    users: normalizedUsers,
    loading: isLoading,
    error: error?.message || null,
  };
}
