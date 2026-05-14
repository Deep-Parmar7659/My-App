import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  // Get Stored Value
  const [storedValue, setStoredValue] = useState(() => {
    const savedValue = localStorage.getItem(key);

    return savedValue ? JSON.parse(savedValue) : initialValue;
  });

  // Save To localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
