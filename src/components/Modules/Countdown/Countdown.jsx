import { useAtomValue } from 'jotai';
import { currentTaskNameAtom } from '@/atoms/taskAtoms';
import { useTimer } from '@/hooks/useTimer';
import './Countdown.scss';

const Countdown = () => {
  const { timer, isRunning, toggleTimer, resetTimer } = useTimer();
  const TimerSwitch = {
    on: 'Start',
    off: 'Pause',
    reset: 'Reset',
  };
  const DEFAULT_TASK = 'Time to focus';
  const minDisplay = String(Math.floor(timer / 60)).padStart(2, '0');
  const secDisplay = String(Math.floor(timer % 60)).padStart(2, '0');
  const currentTaskName = useAtomValue(currentTaskNameAtom) || DEFAULT_TASK;

  return (
    <div className="countdown__wrapper">
      <div className="countdown__display">
        <h1 className="countdown__timer">
          {minDisplay}:{secDisplay}
        </h1>
        <h1 className="countdown__currentTask">{currentTaskName}</h1>
        <div className="countdown__btn">
          <button
            className={`isRunning ${isRunning ? 'isRunning--off' : 'isRunning--on'}`}
            onClick={toggleTimer}
          >
            {toggleTimer ? TimerSwitch.on : TimerSwitch.off}
          </button>
          <button
            className={`isRunning ${toggleTimer ? 'isRunning--off' : 'iisRunning--on'}`}
            onClick={resetTimer}
          >
            {TimerSwitch.reset}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
