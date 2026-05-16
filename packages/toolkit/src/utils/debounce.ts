export type DebouncedFn<TArgs extends readonly unknown[], TReturn> = ((...args: TArgs) => void) & {
  cancel(): void;
  flush(): TReturn | undefined;
};

/**
 * Creates a debounced function that delays invoking `fn` until `waitMs` ms
 * have elapsed since the last call. Works in browser and Node (timers API).
 */
export function debounce<TArgs extends readonly unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  waitMs: number,
): DebouncedFn<TArgs, TReturn> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  let pendingArgs: TArgs | undefined;

  const clearTimer = () => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  };

  const run = (): TReturn | undefined => {
    if (!pendingArgs) return undefined;
    const args = pendingArgs;
    pendingArgs = undefined;
    return fn(...args);
  };

  const debounced = (...args: TArgs) => {
    pendingArgs = args;
    clearTimer();
    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      run();
    }, waitMs);
  };

  debounced.cancel = () => {
    clearTimer();
    pendingArgs = undefined;
  };

  debounced.flush = () => {
    clearTimer();
    return run();
  };

  return debounced as DebouncedFn<TArgs, TReturn>;
}
