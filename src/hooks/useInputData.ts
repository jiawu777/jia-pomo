import { useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { addTaskAtom } from '@/atoms/taskAtoms';

interface Errors {
  task?: string;
  estimateCycle?: string;
}

const useInputData = () => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const estimateCycleRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const addTask = useSetAtom(addTaskAtom);
  const defaultStatus = {
    estimateCycle: 1,
    task: 'Time to focus!',
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    const task = taskNameRef.current?.value.trim();
    const estimateCycle = Number(estimateCycleRef.current?.value);
    if (!task) newErrors.task = '請輸入任務名稱';
    if (!estimateCycle || isNaN(estimateCycle))
      newErrors.estimateCycle = '請輸入正確的循環數(至少1)';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    // prevent default render
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName: taskNameRef.current!.value.trim(),
      estimateCycle: Number(estimateCycleRef.current!.value),
      completed: false,
    };

    // addNewTask(newTask);
    addTask(newTask);

    // reset value
    if (taskNameRef.current) taskNameRef.current.value = defaultStatus.task;
    if (estimateCycleRef.current)
      estimateCycleRef.current.value = defaultStatus.estimateCycle.toString();

    setErrors({});
  };

  return {
    taskNameRef,
    estimateCycleRef,
    errors,
    handleSubmit,
  };
};

export { useInputData };
