import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { persist } from 'zustand/middleware';
import { KanbanColumn } from '@/components/kanban/board-column';
import { UniqueIdentifier } from '@dnd-kit/core';

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
}

export type KanbanState = {
  tasks: Task[];
  columns: KanbanColumn[];
  draggedTask: string | null;
};

const initialTasks: Task[] = [
  // Backlog
  {
    id: 'task1',
    status: 'TODO',
    title: 'Identify Target Audience',
    description:
      'Research and identify the target audience for lead generation.'
  },
  // In Progress
  {
    id: 'task2',
    status: 'IN_PROGRESS',
    title: 'Create Lead Magnet',
    description:
      'Design and create a lead magnet (e.g., eBook or checklist) to attract potential leads.'
  },
  {
    id: 'task3',
    status: 'IN_PROGRESS',
    title: 'Optimize Landing Page',
    description: 'Ensure the landing page is optimized for lead capture.'
  },
  {
    id: 'task4',
    status: 'TODO',
    title: 'Setup Google Ads Campaign',
    description: 'Configure Google Ads targeting the identified audience.'
  },
  // Follow Up
  {
    id: 'task5',
    status: 'TODO',
    title: 'Launch Facebook Ad Campaign',
    description: 'Launch a Facebook Ads campaign for lead generation.'
  },
  {
    id: 'task6',
    status: 'IN_PROGRESS',
    title: 'Review and Qualify Leads',
    description:
      'Review incoming leads and qualify them based on engagement and relevance.'
  },
  {
    id: 'task7',
    status: 'TODO',
    title: 'Develop Lead Nurturing Strategy',
    description: 'Create a follow-up strategy to nurture the leads.'
  },
  // Follow Up
  {
    id: 'task8',
    status: 'IN_PROGRESS',
    title: 'Handoff Leads to Sales Team',
    description: 'Send qualified leads to the sales team for further follow-up.'
  },
  // Done
  {
    id: 'task9',
    status: 'DONE',
    title: 'Follow Up with Key Client (ABC Corp)',
    description:
      'Contact key clients for feedback and potential upsell opportunities.'
  },
  {
    id: 'task10',
    status: 'DONE',
    title: 'Create Initial Sales Pitch',
    description: 'Draft and finalize the initial sales pitch for new leads.'
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
