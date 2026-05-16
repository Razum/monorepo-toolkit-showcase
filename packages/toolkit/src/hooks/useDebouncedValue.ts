import { useEffect, useRef, useState } from 'react';

/**
 * Debounces a value — updates returned state only after `delay` ms of inactivity.
 * Clears timers on cleanup (Mantine-style behavior).
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = undefined;
      setDebounced(value);
    }, delay);

    return () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [value, delay]);

  return debounced;
}
