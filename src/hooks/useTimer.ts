import { useRef, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  isRunning,
  timeLeftAtom,
  addUsedCycleAtom,
  DEFAULT_BREAKTIME,
  DEFAULT_WORKTIME,
} from '@/atoms/taskAtoms';
import { useCycle } from '@/hooks/useStatus';

const useTimer = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useAtom(timeLeftAtom);
  const [running, setRunning] = useAtom(isRunning);
  const { state, switchState } = useCycle();
  const addUsedCycle = useSetAtom(addUsedCycleAtom);

  // 倒數計時器
  useEffect(() => {
    clearInterval(timerRef.current!);
    if (running) {
      timerRef.current = setInterval(() => {
        setTimer((prev: number) => {
          if (prev <= 0) {
            clearInterval(timerRef.current!);
            addUsedCycle();
            setRunning(false);
            switchState();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
      setRunning(false);
    }
  }, [running]);

  // 切換計時器開關
  const toggleTimer = () => {
    const runningStatus = !running;
    setRunning(runningStatus);
  };

  // 重置計時器
  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setRunning(false);
    if (state === 'work') {
      setTimer(DEFAULT_WORKTIME);
    } else {
      setTimer(DEFAULT_BREAKTIME);
    }
    return 0;
  };

  // 略過計時器
  const skipTimer = () => {
    clearInterval(timerRef.current!);
    setRunning(false);
    switchState();
  };

  // 切換計時器狀態自動渲染預設時間
  useEffect(() => {
    const nextDefaultTime = state === 'work' ? DEFAULT_WORKTIME : DEFAULT_BREAKTIME;
    setTimer(nextDefaultTime);
  }, [state]);

  return {
    timer,
    running,
    toggleTimer,
    resetTimer,
    skipTimer,
  };
};

export { useTimer };
