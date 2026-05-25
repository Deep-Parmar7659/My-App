// Custom Hook to fetch users :-
// Moved all logic OUT of component
// Now reusable anywhere
// Users logic
import useFetch from "./useFetch";
import { getUsers } from "../api/userService";

export default function useFetchUsers() {
  const { data, loading, error } = useFetch(getUsers);

  const normalizedUsers = Array.isArray(data?.users)
    ? data.users.map((user) => ({
        id: user.id,

        name: `${user.firstName} ${user.lastName}`,

        email: user.email,

        age: user.age,

        company: user.company,
      }))
    : [];

  return {
    users: normalizedUsers,
    loading,
    error,
  };
}
