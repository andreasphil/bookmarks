import { useEffect, useState } from "react";

/**
 * @template T
 * @param {number} delay
 * @param {T} init
 * @returns {[T, T, import("react").Dispatch<import("react").SetStateAction<T>>]}
 */
export function useDebouncedState(delay, init) {
  const [debouncedVal, setDebouncedVal] = useState(init);
  const [val, setVal] = useState(init);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay, val]);

  return [val, debouncedVal, setVal];
}
