import useSearchAsync from "./useSearchAsync";

import { searchUsers } from "../api/userService";

export default function useUserSearch() {
  const { search, setSearch, results, loading, error } =
    useSearchAsync(searchUsers);

  return {
    search,
    setSearch,
    users: results,
    loading,
    error,
  };
}
