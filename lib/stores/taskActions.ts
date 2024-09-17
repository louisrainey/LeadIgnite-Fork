import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';
import { KanbanColumn } from '@/components/kanban/board-column';
import { UniqueIdentifier } from '@dnd-kit/core';
import { TeamMember } from '@/types/userProfile';

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

const defaultCols = [
  {
    id: 'TODO',
    title: 'To Do'
  },
  {
    id: 'IN_PROGRESS',
    title: 'In Progress'
  },
  {
    id: 'DONE',
    title: 'Done'
  }
] satisfies KanbanColumn[];

export type ColumnId = (typeof defaultCols)[number]['id'];
export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: Status;
  priority?: Priority;
  dueDate?: string; // YYYY-MM-DD format
  assignedToTeamMember?: string;
}

export type KanbanState = {
  tasks: Task[];
  columns: KanbanColumn[];
  draggedTask: string | null;
};

export const initialTasks: Task[] = [
  {
    id: 'task1',
    title: 'Design New Landing Page',
    description:
      'Create a responsive design for the new product launch landing page.',
    status: 'IN_PROGRESS',
    priority: 'high',
    dueDate: '2024-09-20',
    assignedToTeamMember: 'team_member_1'
  },
  {
    id: 'task2',
    title: 'Optimize SEO Strategy',
    description:
      'Revise the SEO plan for improved search rankings in the next quarter.',
    status: 'TODO',
    priority: 'medium',
    dueDate: '2024-09-25',
    assignedToTeamMember: 'team_member_2'
  },
  {
    id: 'task3',
    title: 'Client Onboarding',
    description:
      'Guide the new client through the onboarding process and answer any questions.',
    status: 'TODO',
    priority: 'high',
    dueDate: '2024-09-18',
    assignedToTeamMember: 'team_member_3'
  },
  {
    id: 'task4',
    title: 'Monthly Performance Report',
    description:
      'Compile and present the monthly performance report to the management team.',
    status: 'DONE',
    priority: 'low',
    dueDate: '2024-09-10',
    assignedToTeamMember: 'team_member_4'
  },
  {
    id: 'task5',
    title: 'Content Plan for Social Media',
    description:
      'Develop a content calendar for the upcoming quarter’s social media posts.',
    status: 'IN_PROGRESS',
    priority: 'medium',
    dueDate: '2024-09-30',
    assignedToTeamMember: 'team_member_5'
  }
];

export type Actions = {
  addTask: (title: string, description?: string) => void;
  addCol: (title: string) => void;
  dragTask: (id: string | null) => void;
  removeTask: (title: string) => void;
  removeCol: (id: UniqueIdentifier) => void;
  setTasks: (updatedTask: Task[]) => void;
  setCols: (cols: KanbanColumn[]) => void;
  updateCol: (id: UniqueIdentifier, newName: string) => void;
};

export const useTaskStore = create<KanbanState & Actions>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      columns: defaultCols,
      draggedTask: null,
      addTask: (title: string, description?: string) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: uuid(), title, description, status: 'TODO' }
          ]
        })),
      updateCol: (id: UniqueIdentifier, newName: string) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === id ? { ...col, title: newName } : col
          )
        })),
      addCol: (title: string) =>
        set((state) => ({
          columns: [
            ...state.columns,
            { title, id: state.columns.length ? title.toUpperCase() : 'TODO' }
          ]
        })),
      dragTask: (id: string | null) => set({ draggedTask: id }),
      removeTask: (id: string) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      removeCol: (id: UniqueIdentifier) =>
        set((state) => ({
          columns: state.columns.filter((col) => col.id !== id)
        })),
      setTasks: (newTasks: Task[]) => set({ tasks: newTasks }),
      setCols: (newCols: KanbanColumn[]) => set({ columns: newCols })
    }),
    { name: 'task-store', skipHydration: true }
  )
);
