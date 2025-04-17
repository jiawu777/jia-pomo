import { useAtomValue } from 'jotai';
import { isRunning } from '@/atoms/taskAtoms';
import { useInputData } from '@/hooks/useInputData';
import './InputData.scss';

const InputData = () => {
  const addTaskBtn = 'Add';
  const { taskNameRef, estimateCycleRef, errors, handleSubmit } = useInputData();
  const runningStatus = useAtomValue(isRunning);
  return (
    <div className={`input__wrapper ${runningStatus ? 'input__wrapper--hide' : ''}`}>
      <form
        className={`input__form `}
        onSubmit={handleSubmit}
      >
        <input
          required
          className="input input__task"
          type="text"
          ref={taskNameRef}
          placeholder="Enter Task"
        />
        {errors.task && <span className="err__taskError">{errors.task}</span>}
        <input
          required
          className="input input__cycle"
          type="number"
          ref={estimateCycleRef}
          placeholder="Enter Cycle"
          min={1}
        />
        {errors.estimateCycle && (
          <span className="err__estimateCycleError">{errors.estimateCycle}</span>
        )}
        <button
          type="submit"
          className="input__btn"
        >
          {addTaskBtn}
        </button>
      </form>
    </div>
  );
};

export default InputData;
