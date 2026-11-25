import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export const POINTS_PER_TASK = 10;

type TasksState = {
  myTaskIds: string[];
  doneIds: string[];
  points: number;
  addTask: (id: string) => void;
  toggleDone: (id: string) => void;
  removeTask: (id: string) => void;
};

const TasksContext = createContext<TasksState | null>(null);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [myTaskIds, setMyTaskIds] = useState<string[]>([]);
  const [doneIds, setDoneIds] = useState<string[]>([]);

  const addTask = useCallback((id: string) => setMyTaskIds((current) => [...current, id]), []);

  const toggleDone = useCallback(
    (id: string) =>
      setDoneIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id])),
    [],
  );

  const removeTask = useCallback((id: string) => {
    setMyTaskIds((current) => current.filter((item) => item !== id));
    setDoneIds((current) => current.filter((item) => item !== id));
  }, []);

  const value = useMemo(
    () => ({ myTaskIds, doneIds, points: doneIds.length * POINTS_PER_TASK, addTask, toggleDone, removeTask }),
    [myTaskIds, doneIds, addTask, toggleDone, removeTask],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de TasksProvider');
  }
  return context;
}
