import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client'; // Prisma client import
import { Priority, Status, Task } from '@/lib/stores/taskActions';

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Helper to validate priority and dueDate
const isValidPriority = (priority: any): priority is Priority =>
  ['low', 'medium', 'high'].includes(priority);

const isValidDueDate = (dueDate: any): boolean =>
  /^\d{4}-\d{2}-\d{2}$/.test(dueDate);

// Webhook to add a task for a specific customer (but customerId is not in the task model)
app.post('/webhook/add-task', async (req: Request, res: Response) => {
  const { customerId, status, taskTitle, taskDescription, priority, dueDate } =
    req.body as {
      customerId: string; // Used only to find the customer
      status: Status;
      taskTitle: string;
      taskDescription?: string;
      priority?: Priority;
      dueDate?: string;
    };

  // Validate incoming data
  if (
    !customerId ||
    !status ||
    !taskTitle ||
    !['TODO', 'IN_PROGRESS', 'DONE'].includes(status)
  ) {
    return res.status(400).json({
      message:
        'Invalid input. Please provide valid customerId, status, and taskTitle.'
    });
  }

  if (priority && !isValidPriority(priority)) {
    return res.status(400).json({
      message: 'Invalid priority. Must be "low", "medium", or "high".'
    });
  }

  if (dueDate && !isValidDueDate(dueDate)) {
    return res.status(400).json({
      message: 'Invalid due date format. Must be YYYY-MM-DD.'
    });
  }

  // Check if customer exists (you can skip this if customer data is already validated elsewhere)
  const customer = await prisma.customer.findUnique({
    where: { id: customerId }
  });

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found.' });
  }

  // Create a new task (without customerId)
  try {
    const newTask: Task = {
      id: uuidv4(), // Unique task ID
      title: taskTitle,
      description: taskDescription || '', // Optional description
      status,
      priority: priority || 'medium', // Default to medium if not provided
      dueDate: dueDate
        ? new Date(dueDate).toISOString().split('T')[0]
        : undefined // Optional due date
    };

    // Save the task to the customer’s database (based on customerId)
    await prisma.task.create({
      data: {
        id: newTask.id,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status,
        priority: newTask.priority,
        dueDate: newTask.dueDate ? new Date(newTask.dueDate) : null,
        customer: { connect: { id: customerId } } // Link task to customer without adding customerId to task itself
      }
    });

    console.log(`Added new task for customer ${customerId}:`, newTask);

    return res
      .status(200)
      .json({ message: 'Task added successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({
      message: 'Failed to create task. Please try again later.'
    });
  }
});

// Get all tasks for a specific customer (for debugging or review)
app.get('/customer/:customerId/tasks', async (req: Request, res: Response) => {
  const { customerId } = req.params;

  try {
    const tasks = await prisma.task.findMany({
      where: { customerId }
    });

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: 'No tasks found for this customer.' });
    }

    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({
      message: 'Failed to fetch tasks. Please try again later.'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
