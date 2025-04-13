import { useState, useEffect } from 'react';

type Task = {
  id: number;
  title: string;
  totalRound: number;
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
      // console.log(`getUserInfo:`, initial);
      return initial;
    } catch (error) {
      console.error('Failed to parse userInfo from localStorage:', error);
      return defaultUserInfo;
    }
  });

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  const addNewTask = (task: { title: string; totalRound: number }) => {
    const newTask: Task = {
      id: Date.now(),
      title: task.title,
      totalRound: task.totalRound,
      completed: false,
    };

    setUserInfo((prev) => ({
      tasks: [...prev.tasks, newTask],
      currentTaskId: newTask.id,
    }));
    // console.log(`add new task:`, userInfo);
  };

  return { userInfo, addNewTask };
};

export { useLocalstorage };
