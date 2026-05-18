import { useEffect, useRef, useState } from "react";

export default function usePrevious(value) {
  const ref = useRef();

  const [previousValue, setPreviousValue] = useState();

  useEffect(() => {
    setPreviousValue(ref.current);

    ref.current = value;
  }, [value]);

  return previousValue;
}
