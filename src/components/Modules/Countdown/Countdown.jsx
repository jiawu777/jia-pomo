import { useAtomValue } from 'jotai';
import { currentTaskAtom, DEFAULT_BREAKTEXT, timerStateAtom } from '@/atoms/taskAtoms';
import { useTimer } from '@/hooks/useTimer';
import './Countdown.scss';

const Countdown = () => {
  const { timer, running, toggleTimer, resetTimer, skipTimer } = useTimer();
  const TimerSwitch = {
    on: 'Start',
    off: 'Pause',
    reset: 'Reset',
    skip: 'Skip',
  };
  const minDisplay = String(Math.floor(timer / 60)).padStart(2, '0');
  const secDisplay = String(Math.floor(timer % 60)).padStart(2, '0');
  const { taskName, estimateCycle, usedCycle } = useAtomValue(currentTaskAtom);
  const { state } = useAtomValue(timerStateAtom);

  return (
    <div className="countdown__wrapper">
      <div className="countdown__display">
        <h1 className="countdown__timer">
          {minDisplay}:{secDisplay}
        </h1>
        <h1 className="countdown__currentTask">{taskName}</h1>
        <h1 className="countdown__currentestimateCycle">
          {usedCycle}/{estimateCycle}
        </h1>
        <div className="countdown__btn">
          <button
            className={`btn__toggleTimer ${
              running ? 'btn__toggleTimer--off' : 'btn__toggleTimer--on'
            }`}
            onClick={toggleTimer}
          >
            {running ? TimerSwitch.off : TimerSwitch.on}
          </button>
          <button
            className={`btn__reset`}
            onClick={resetTimer}
          >
            {TimerSwitch.reset}
          </button>
          <button
            className={`btn__skip`}
            onClick={skipTimer}
          >
            {TimerSwitch.skip}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
