import { useRef, useState } from 'react';
import { useLocalstorage } from '@/hooks/useLocalStorage';

interface Errors {
  task?: string;
  cycle?: string;
}

const useInputData = () => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const cycleRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const { addNewTask } = useLocalstorage();

  const defaultStatus = {
    cycle: 1,
    task: 'Time to focus!',
  };

  const validate = (): Errors => {
    const newErrors: Errors = {};
    const task = taskNameRef.current?.value.trim();
    const cycle = Number(cycleRef.current?.value);
    if (!task) newErrors.task = '請輸入任務名稱';
    if (!cycle || isNaN(cycle)) newErrors.cycle = '請輸入正確的循環數(至少1)';

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
      cycle: Number(cycleRef.current!.value),
      completed: false,
    };

    addNewTask(newTask);

    // reset value
    if (taskNameRef.current) taskNameRef.current.value = defaultStatus.task;
    if (cycleRef.current) cycleRef.current.value = defaultStatus.cycle.toString();

    setErrors({});
  };

  return {
    taskNameRef,
    cycleRef,
    errors,
    handleSubmit,
  };
};

export { useInputData };
