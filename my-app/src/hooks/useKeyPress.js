import { useEffect } from "react";

export default function useKeyPress(key, callback) {
  useEffect(() => {
    // Key Press Handler
    const handleKeyPress = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    // Add Event Listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [key, callback]);
}
