import { useState, useRef, useEffect } from 'react';

const DEFAULT_TIME = 25 * 60;

const useTimer = () => {
  const [timer, setTimer] = useState(DEFAULT_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 倒數計時器
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
      setIsRunning(false);
    }
  }, [isRunning]);

  // 切換計時器開關
  const toggleTimer = () => {
    const status = !isRunning;
    setIsRunning(status);
  };

  // 重置計時器
  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setIsRunning(false);
    setTimer(DEFAULT_TIME);
    return 0;
  };

  return {
    timer,
    isRunning,
    toggleTimer,
    resetTimer,
  };
};

export { useTimer };
