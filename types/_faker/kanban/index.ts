import { KanbanColumn } from '@/components/kanban/board-column';
import { KanbanState, Status, Task } from '@/lib/stores/taskActions';
import { faker } from '@faker-js/faker';
import { APP_TESTING_MODE } from '../../../constants/data';

// Default column structure with status-based `id`
const defaultCols: KanbanColumn[] = [
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
];

// Faker utility to generate mock tasks
export const generateMockTasks = (count: number): Task[] => {
  const statuses: Status[] = ['TODO', 'IN_PROGRESS', 'DONE'];

  return Array.from({ length: count }, () => {
    const status = faker.helpers.arrayElement(statuses); // Random status for the task
    return {
      id: faker.string.uuid(),
      title: faker.company.catchPhrase(),
      description: faker.lorem.sentences(2),
      status
    };
  });
};

// Function to generate the initial Kanban state with Faker data
export const generateKanbanState = (taskCount: number): KanbanState => {
  const tasks = generateMockTasks(taskCount);

  // Organize tasks into columns based on their status
  const columns = defaultCols.map((column) => ({
    ...column,
    taskIds: tasks
      .filter((task) => task.status === column.id) // Only add tasks matching the column's status
      .map((task) => task.id) // Collect task IDs
  }));

  return {
    tasks,
    columns,
    draggedTask: null // Initially, no task is being dragged
  };
};

// Example usage: Generate a Kanban state with 10 tasks
export const mockKanbanState = APP_TESTING_MODE && generateKanbanState(10);
