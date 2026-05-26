import useFetch from "./useFetch";
import { getUsers } from "../api/userService";

export default function useFetchUsers() {
  const { data, loading, error } = useFetch(getUsers);

  const users = Array.isArray(data)
    ? data.map((user) => ({
        id: user.id,

        name:
          user.name || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),

        email: user.email,

        age: user.age,

        company:
          typeof user.company === "object"
            ? user.company
            : { name: user.company || "N/A" },
      }))
    : [];

  return {
    users,
    loading,
    error,
  };
}
