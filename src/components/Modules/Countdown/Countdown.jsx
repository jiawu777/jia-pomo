import { useState, useRef, useEffect } from 'react';
import { useLocalstorage } from '@/hooks/useLocalStorage';
import './Countdown.scss';

const Countdown = () => {
  const defaultRound = 1;
  const defaultStatus = {
    time: defaultRound * 25 * 60,
    task: 'Time to focus!',
  };
  const TimerSwitch = {
    on: 'Start',
    off: 'Pause',
    reset: 'Reset',
  };
  const [timer, setTimer] = useState(defaultStatus.time);
  const [isOn, setIsOn] = useState(false);
  const intervalTimer = useRef(null);
  const intervalTaskName = useRef(defaultStatus.task);

  const { userInfo } = useLocalstorage();

  const switchTimer = () => {
    const newTimerSwitch = !isOn;
    setIsOn(newTimerSwitch);
  };

  const resetTimer = () => {
    clearInterval(intervalTimer.current);
    setIsOn(false);
    return 0;
  };

  useEffect(() => {
    if (isOn) {
      intervalTimer.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 0) {
            clearInterval(intervalTimer.current);
            setIsOn(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      console.log(intervalTimer.current);
    } else {
      clearInterval(intervalTimer.current);
      setIsOn(false);
    }

    return () => clearInterval(intervalTimer.current);
  }, [isOn]);

  const minDisplay = Math.floor(timer / 60) || '00';
  const secDisplay = Math.floor(timer % 60) || '00';

  // 撈取現在任務標題
  useEffect(() => {
    const currentTaskTitle = userInfo.tasks.find((task) => task.id === userInfo.currentTaskId);
    if (currentTaskTitle) {
      intervalTaskName.current = currentTaskTitle.title;
    } else {
      intervalTaskName.current = defaultStatus.task;
    }
  }, [userInfo]);

  return (
    <div className="countdown__wrapper">
      <div className="countdown__display">
        <h1 className="countdown__timer">
          {minDisplay}:{secDisplay}
        </h1>
        <h1 className="countdown__currentTask">{intervalTaskName.current}</h1>
        <div className="countdown__btn">
          <button
            className={`isOn ${isOn ? 'isOn--off' : 'isOn--on'}`}
            onClick={switchTimer}
          >
            {isOn ? TimerSwitch.off : TimerSwitch.on}
          </button>
          <button
            className={`isOn ${isOn ? 'isOn--off' : 'isOn--on'}`}
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
