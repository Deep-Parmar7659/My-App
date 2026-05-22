import { useEffect } from "react";

export default function TestAbort() {
  useEffect(() => {
    const controller = new AbortController();

    async function getUsers() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const response = await fetch("https://dummyjson.com/users", {
          signal: controller.signal,
        });

        const data = await response.json();

        console.log("SUCCESS:", data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request Cancelled");
          return;
        }

        console.error(error);
      }
    }

    getUsers();
    console.log("Component Mounted");

    return () => {
      console.log("Cleanup Running");
      controller.abort();
    };
  }, []);

  return <div>Test AbortController</div>;
}
