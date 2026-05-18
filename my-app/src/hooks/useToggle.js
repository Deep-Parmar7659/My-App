import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Toggle
  const toggle = () => {
    setValue((prev) => !prev);
  };

  // Set True
  const setTrue = () => {
    setValue(true);
  };

  // Set False
  const setFalse = () => {
    setValue(false);
  };

  return {
    value,
    toggle,
    setTrue,
    setFalse,
  };
}
