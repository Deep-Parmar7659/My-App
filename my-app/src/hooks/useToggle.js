import { useState } from "react";

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Toggle Function
  const toggleValue = () => {
    setValue((prev) => !prev);
  };

  return [value, toggleValue];
}
