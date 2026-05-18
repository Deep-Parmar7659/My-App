import { useState, useEffect } from "react";

export default function useOnlineStatus() {
  // Online State
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Online Handler
    const handleOnline = () => {
      setIsOnline(true);
    };

    // Offline Handler
    const handleOffline = () => {
      setIsOnline(false);
    };

    // Event Listeners
    window.addEventListener("online", handleOnline);

    window.addEventListener("offline", handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);

      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}
