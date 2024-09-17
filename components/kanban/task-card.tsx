import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Task } from '@/lib/stores/taskActions';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { GripVertical } from 'lucide-react';
import { Badge } from '../ui/badge';

// Priority-to-Badge variant mapping
const priorityBadgeVariant = {
  low: 'outline', // Map 'low' to 'outline'
  medium: 'default', // Map 'medium' to 'default'
  high: 'destructive' // Map 'high' to 'destructive'
} as const;

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

export type TaskType = 'Task';

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task
    } satisfies TaskDragData,
    attributes: {
      roleDescription: 'Task'
    }
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform)
  };

  const variants = cva('', {
    variants: {
      dragging: {
        over: 'ring-2 opacity-30',
        overlay: 'ring-2 ring-primary'
      }
    }
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? 'overlay' : isDragging ? 'over' : undefined
      })}
    >
      <CardHeader className="space-between relative flex flex-row border-b-2 border-secondary px-3 py-3">
        {/* Drag handle button */}
        <Button
          variant={'ghost'}
          {...attributes}
          {...listeners}
          className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
        >
          <span className="sr-only">Move task</span>
          <GripVertical />
        </Button>
        {/* Badge for Task */}
        <Badge variant={'outline'} className="ml-auto font-semibold">
          Task
        </Badge>
      </CardHeader>

      {/* Task Content */}
      <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left">
        {/* Task Title */}
        <div className="text-lg font-semibold">{task.title}</div>

        {/* Task Description */}
        {task.description && (
          <div className="mt-2 text-sm text-muted-foreground">
            {task.description}
          </div>
        )}

        {/* Priority */}
        {task.priority && (
          <div className="mt-2 text-sm">
            <span className="font-semibold">Priority: </span>
            <Badge
              variant={priorityBadgeVariant[task.priority] || 'outline'} // Map priority to Badge variant
              className="ml-2"
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
          </div>
        )}

        {/* Due Date */}
        {task.dueDate && (
          <div className="mt-2 text-sm">
            <span className="font-semibold">Due Date: </span>
            <span className="text-muted-foreground">{task.dueDate}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
