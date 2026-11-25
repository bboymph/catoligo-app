import tasksInfo from './tasks-info.json';

export type TaskInfo = {
  Title: string;
  Description: string;
  Frequency: string;
  details: string;
};

const infoById: Record<string, TaskInfo> = tasksInfo.tasks;

export function getTaskInfo(id: string | undefined) {
  const task = tasks.find((item) => item.id === id);
  const info = id ? infoById[id] : undefined;
  return task && info ? { icon: task.icon, info } : undefined;
}

export type TaskItem = {
  id: string;
  title: string;
  description: string;
  icon: 'rosary' | 'adoration' | 'mass' | 'lectio';
};

export const tasks: TaskItem[] = [
  {
    id: 'rosary',
    title: 'Santo Rosário',
    description: 'Reze os mistérios do dia meditando a vida de Jesus e Maria.',
    icon: 'rosary',
  },
  {
    id: 'chapel-adoration',
    title: 'Adoração na capela',
    description: 'Reserve um tempo de silêncio diante do Santíssimo Sacramento.',
    icon: 'adoration',
  },
  {
    id: 'mass',
    title: 'Missa',
    description: 'Participe da celebração da Eucaristia em sua comunidade.',
    icon: 'mass',
  },
  {
    id: 'lectio-divina',
    title: 'Lectio Divina',
    description: 'Leia, medite, ore e contemple a Palavra de Deus.',
    icon: 'lectio',
  },
];
