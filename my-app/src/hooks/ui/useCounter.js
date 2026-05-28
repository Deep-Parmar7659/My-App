import { useState } from "react";

export default function useCounter(initialValue = 0) {
  // Counter State
  const [count, setCount] = useState(initialValue);

  // Increment
  const increment = () => {
    setCount((prev) => prev + 1);
  };

  // Decrement
  const decrement = () => {
    setCount((prev) => prev - 1);
  };

  // Reset
  const reset = () => {
    setCount(initialValue);
  };

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
