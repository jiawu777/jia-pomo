import { atom, useSetAtom } from 'jotai';

// type
type Task = {
  id: number;
  taskName: string;
  estimateCycle: number;
  usedCycle: number;
  completed: boolean;
};

type UserInfo = {
  tasks: Task[];
  currentTaskId: number;
};

// configure
const STORAGE_KEY = 'userInfo';
const DEFAULT_TASK = 'Time to focus!';
const DEFAULT_estimateCycle = 1;
const DEFAULT_WORKTIME = 10;
const DEFAULT_BREAKTIME = 5;
const DEFAULT_BREAKTEXT = 'Break time!';

// default
const defaultUserInfo: UserInfo = {
  tasks: [],
  currentTaskId: 0,
};

// state
const timerStateAtom = atom<'work' | 'break'>('work');
const isRunning = atom(false);
const timeLeftAtom = atom(DEFAULT_WORKTIME);

// function
const getUserInfo = (): UserInfo => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultUserInfo;
  } catch {
    return defaultUserInfo;
  }
};

const userInfoAtom = atom<UserInfo>(getUserInfo());

const currentTaskAtom = atom((get) => {
  const userInfo = get(userInfoAtom);
  const task = userInfo.tasks.find((task) => {
    return task.id === userInfo.currentTaskId;
  });
  return {
    taskName: task?.taskName || DEFAULT_TASK,
    estimateCycle: task?.estimateCycle || DEFAULT_estimateCycle,
    usedCycle: task?.usedCycle || 0,
  };
});

const addTaskAtom = atom(null, (get, set, task: { taskName: string; estimateCycle: number }) => {
  const prev = get(userInfoAtom);
  const newTask: Task = {
    id: Date.now(),
    taskName: task.taskName,
    estimateCycle: task.estimateCycle,
    usedCycle: 0,
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

const addUsedCycleAtom = atom(null, (get, set) => {
  const userInfo = get(userInfoAtom);
  const updatedTasks = userInfo.tasks.map((task) => {
    if (task.id === userInfo.currentTaskId) {
      return {
        ...task,
        usedCycle: task.usedCycle + 1,
      };
    }
    return task;
  });

  const updatedUserInfo = {
    ...userInfo,
    tasks: updatedTasks,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserInfo));
  set(userInfoAtom, updatedUserInfo);
});

export type { Task, UserInfo };
export {
  timerStateAtom,
  isRunning,
  timeLeftAtom,
  userInfoAtom,
  currentTaskAtom,
  addTaskAtom,
  addUsedCycleAtom,
  DEFAULT_WORKTIME,
  DEFAULT_BREAKTIME,
  DEFAULT_BREAKTEXT,
};
