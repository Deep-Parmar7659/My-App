import useFetch from "../hooks/useFetch";
import { getUsers } from "../api/userService";

export default function TestUseFetchAbort() {
  const { data, loading, error } = useFetch(getUsers);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Users List</h1>

      {data?.users?.map((user) => (
        <p key={user.id}>{user.firstName}</p>
      ))}
    </div>
  );
}
