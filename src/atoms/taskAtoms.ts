import { atom } from 'jotai';
type Task = {
  id: number;
  taskName: string;
  cycle: number;
  completed: boolean;
};

type UserInfo = {
  tasks: Task[];
  currentTaskId: number;
};

const STORAGE_KEY = 'userInfo';
const DEFAULT_TASK = 'Time to focus!';

const defaultUserInfo: UserInfo = {
  tasks: [],
  currentTaskId: 0,
};

const getUserInfo = (): UserInfo => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultUserInfo;
  } catch {
    return defaultUserInfo;
  }
};

const userInfoAtom = atom<UserInfo>(getUserInfo());

const currentTaskNameAtom = atom((get) => {
  const userInfo = get(userInfoAtom);
  const task = userInfo.tasks.find((task) => {
    return task.id === userInfo.currentTaskId;
  });
  return task?.taskName || DEFAULT_TASK;
});

const addTaskAtom = atom(null, (get, set, task: { taskName: string; cycle: number }) => {
  const prev = get(userInfoAtom);
  const newTask: Task = {
    id: Date.now(),
    taskName: task.taskName,
    cycle: task.cycle,
    completed: false,
  };

  const updateData = {
    ...prev,
    tasks: [...prev.tasks, newTask],
    currentTaskId: newTask.id,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
  set(userInfoAtom, updateData);
});

export type { Task, UserInfo };
export { userInfoAtom, currentTaskNameAtom, addTaskAtom };
