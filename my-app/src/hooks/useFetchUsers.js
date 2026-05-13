// Custom Hook to fetch users :-
// Moved all logic OUT of component
// Now reusable anywhere
// Users logic
import useFetch from "./useFetch";
import { getUsers } from "../services/api";

export default function useFetchUsers() {
  const { data: users, loading, error, refetch } = useFetch(getUsers);

  return {
    users: users || [],
    loading,
    error,
    refetch,
  };
}
