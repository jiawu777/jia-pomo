import { useState, useRef, useEffect } from 'react';
import { useLocalstorage } from '@/hooks/useLocalStorage';
import './InputData.scss';

const InputData = () => {
  const defaultStatus = {
    totalRound: 1,
    task: 'Time to focus!',
  };

  const addTaskBtn = 'Add';
  const intervalTotalRound = useRef(defaultStatus.totalRound);
  const intervalTaskName = useRef(defaultStatus.task);
  const { addNewTask } = useLocalstorage();

  const handleTaskInput = (e) => {
    // prevent default render
    e.preventDefault();

    const taskName = intervalTaskName.current;
    const totalRound = Number(intervalTotalRound?.current);
    console.log(
      `currentTaskName: ${intervalTaskName.current}; totalRound: ${intervalTotalRound.current}`
    );
    const newTask = {
      id: Date.now(),
      title: taskName,
      totalRound: totalRound,
      completed: false,
    };

    addNewTask(newTask);

    // reset input
    intervalTaskName.current = defaultStatus.task;
    intervalTotalRound.current = defaultStatus.totalRound;
  };

  return (
    <div className={`input__wrapper`}>
      <form className="input__form">
        <input
          required
          className="input__time"
          type="number"
          ref={intervalTotalRound}
          defaultValue={defaultStatus.totalRound}
          placeholder="Enter time(min)"
        />
        <input
          required
          className="input__task"
          type="text"
          ref={intervalTaskName}
          placeholder="Enter task"
        />
        <button
          className="input__addTaskBtn"
          onChange={handleTaskInput}
        >
          {addTaskBtn}
        </button>
      </form>
    </div>
  );
};

export default InputData;
