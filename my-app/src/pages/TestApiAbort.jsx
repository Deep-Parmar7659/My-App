import { useEffect } from "react";
import { getUsers } from "../api/userService";

export default function TestApiAbort() {
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        const data = await getUsers(controller.signal);

        console.log("SUCCESS:", data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request Cancelled");
          return;
        }

        console.error(error);
      }
    }

    fetchUsers();

    return () => {
      console.log("Cleanup Running");

      controller.abort();
    };
  }, []);

  return <div>Testing apiClient Abort Support</div>;
}
