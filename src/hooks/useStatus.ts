import { useAtom, useSetAtom } from 'jotai';
import {
  timerStateAtom,
  timeLeftAtom,
  DEFAULT_BREAKTIME,
  DEFAULT_WORKTIME,
} from '@/atoms/taskAtoms';

const useCycle = () => {
  const [state, setState] = useAtom(timerStateAtom);
  const setTimeLeft = useSetAtom(timeLeftAtom);
  const switchState = () => {
    if (state === 'work') {
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
