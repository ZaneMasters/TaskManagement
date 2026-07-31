import { Request, Response } from 'express';
import * as TaskService from '../services/task.service';
import { taskSchema, updateTaskSchema } from '../validations/task.validation';

/**
 * Retrieves all tasks from the database.
 * 
 * @example
 * Request: GET /api/tasks
 * Response 200 OK:
 * [
 *   {
 *     "id": 1,
 *     "title": "Buy groceries",
 *     "description": "Milk, Bread, Eggs",
 *     "status": "pending",
 *     "createdAt": "2026-07-30T10:00:00Z",
 *     "updatedAt": "2026-07-30T10:00:00Z"
 *   }
 * ]
 */
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Retrieves a specific task by its ID.
 * 
 * @example
 * Request: GET /api/tasks/1
 * Response 200 OK:
 * {
 *   "id": 1,
 *   "title": "Buy groceries",
 *   "description": "Milk, Bread, Eggs",
 *   "status": "pending",
 *   "createdAt": "2026-07-30T10:00:00Z",
 *   "updatedAt": "2026-07-30T10:00:00Z"
 * }
 * Response 404 Not Found:
 * { "error": "Task not found" }
 */
export const getTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const task = await TaskService.getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Creates a new task.
 * 
 * @example
 * Request: POST /api/tasks
 * Body:
 * {
 *   "title": "Buy groceries",
 *   "description": "Milk, Bread, Eggs",
 *   "status": "pending"
 * }
 * Response 201 Created:
 * {
 *   "id": 2,
 *   "title": "Buy groceries",
 *   "description": "Milk, Bread, Eggs",
 *   "status": "pending",
 *   "createdAt": "2026-07-30T10:00:00Z",
 *   "updatedAt": "2026-07-30T10:00:00Z"
 * }
 * Response 400 Bad Request:
 * { "error": "Validation failed", "details": ["Title is required"] }
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const validationResult = taskSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validationResult.error.errors.map(e => e.message) 
      });
    }

    const newTask = await TaskService.createTask(validationResult.data);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Updates an existing task by ID.
 * 
 * @example
 * Request: PUT /api/tasks/1
 * Body:
 * {
 *   "status": "in_progress"
 * }
 * Response 200 OK:
 * {
 *   "id": 1,
 *   "title": "Buy groceries",
 *   "description": "Milk, Bread, Eggs",
 *   "status": "in_progress",
 *   "createdAt": "2026-07-30T10:00:00Z",
 *   "updatedAt": "2026-07-30T10:30:00Z"
 * }
 */
export const updateTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const validationResult = updateTaskSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validationResult.error.errors.map(e => e.message) 
      });
    }

    const updatedTask = await TaskService.updateTask(id, validationResult.data);
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * Deletes a task by ID.
 * 
 * @example
 * Request: DELETE /api/tasks/1
 * Response 200 OK:
 * { "message": "Task deleted successfully" }
 * Response 404 Not Found:
 * { "error": "Task not found" }
 */
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const deleted = await TaskService.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
