import { useState, useEffect } from 'react';

type Task = {
  id: number;
  taskName: string | undefined;
  cycle: number;
  completed: boolean;
};

type UserInfo = {
  tasks: Task[];
  currentTaskId: number;
};

const defaultUserInfo: UserInfo = {
  tasks: [],
  currentTaskId: 0,
};

const useLocalstorage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(() => {
    try {
      const stored = localStorage.getItem('userInfo');
      const initial = stored ? JSON.parse(stored) : defaultUserInfo;
      return initial;
    } catch (error) {
      console.error('Failed to parse userInfo from localStorage:', error);
      return defaultUserInfo;
    }
  });

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  const addNewTask = (task: { taskName: string; cycle: number }) => {
    const newTask: Task = {
      id: Date.now(),
      taskName: task.taskName,
      cycle: task.cycle,
      completed: false,
    };

    setUserInfo((prev) => ({
      tasks: [...prev.tasks, newTask],
      currentTaskId: newTask.id,
    }));
  };

  return { userInfo, addNewTask };
};

export { useLocalstorage };
