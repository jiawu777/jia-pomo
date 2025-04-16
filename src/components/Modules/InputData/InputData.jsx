import { useInputData } from '@/hooks/useInputData';
import './InputData.scss';

const InputData = () => {
  const addTaskBtn = 'Add';
  const { taskNameRef, estimateCycleRef, errors, handleSubmit } = useInputData();

  return (
    <div className={`input__wrapper`}>
      <form
        className="input__form"
        onSubmit={handleSubmit}
      >
        <input
          required
          className="input__round"
          type="number"
          ref={estimateCycleRef}
          placeholder="Enter estimateCycle"
          min={1}
        />
        {errors.estimateCycle && (
          <span className="input__estimateCycleError">{errors.estimateCycle}</span>
        )}

        <input
          required
          className="input__task"
          type="text"
          ref={taskNameRef}
          placeholder="Enter task"
        />
        {errors.task && <span className="input__taskError">{errors.task}</span>}

        <button
          type="submit"
          className="input__addTaskBtn"
        >
          {addTaskBtn}
        </button>
      </form>
    </div>
  );
};

export default InputData;
