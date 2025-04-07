type DebounceFunction<T extends (...args: unknown[]) => void> = (...args: Parameters<T>) => void;

const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): DebounceFunction<T> => {
  let timerId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

type ThrottleFunction<T extends (...args: unknown[]) => unknown> = (...args: Parameters<T>) => void;

const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): ThrottleFunction<T> => {
  let isThrottled = false;
  let pendingArgs: Parameters<T> | null = null;

  const execute = (...args: Parameters<T>) => {
    if (!isThrottled) {
      func(...args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
        if (pendingArgs) {
          execute(...pendingArgs);
          pendingArgs = null;
        }
      }, delay);
    } else {
      pendingArgs = args;
    }
  };

  return execute;
};

export { debounce, throttle };
