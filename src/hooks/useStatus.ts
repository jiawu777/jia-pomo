import { useAtom, useSetAtom } from 'jotai';
import {
  timerStateAtom,
  timeLeftAtom,
  DEFAULT_BREAKTIME,
  DEFAULT_WORKTIME,
  addUsedCycleAtom,
} from '@/atoms/taskAtoms';

const useCycle = () => {
  const [state, setState] = useAtom(timerStateAtom);
  const setTimeLeft = useSetAtom(timeLeftAtom);
  const addUsedCycle = useSetAtom(addUsedCycleAtom);
  const switchState = () => {
    if (state === 'work') {
      addUsedCycle();
      setState('break');
      setTimeLeft(DEFAULT_BREAKTIME);
    } else {
      setState('work');
      setTimeLeft(DEFAULT_WORKTIME);
    }
  };

  return { state, switchState };
};

export { useCycle };
