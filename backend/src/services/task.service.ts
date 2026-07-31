import { getDB } from '../database';
import { Task, CreateTaskDTO, UpdateTaskDTO } from '../models/task.model';

export const getAllTasks = async (): Promise<Task[]> => {
  const db = getDB();
  return await db.all<Task[]>('SELECT * FROM tasks ORDER BY createdAt DESC');
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  const db = getDB();
  return await db.get<Task>('SELECT * FROM tasks WHERE id = ?', [id]);
};

export const createTask = async (task: CreateTaskDTO): Promise<Task> => {
  const db = getDB();
  const status = task.status || 'pending';
  
  const result = await db.run(
    'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
    [task.title, task.description || null, status]
  );

  const newTask = await getTaskById(result.lastID!);
  return newTask!;
};

export const updateTask = async (id: number, task: UpdateTaskDTO): Promise<Task | undefined> => {
  const db = getDB();
  const existing = await getTaskById(id);
  if (!existing) return undefined;

  const title = task.title !== undefined ? task.title : existing.title;
  const description = task.description !== undefined ? task.description : existing.description;
  const status = task.status !== undefined ? task.status : existing.status;

  await db.run(
    'UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
    [title, description, status, id]
  );

  return await getTaskById(id);
};

export const deleteTask = async (id: number): Promise<boolean> => {
  const db = getDB();
  const existing = await getTaskById(id);
  if (!existing) return false;

  await db.run('DELETE FROM tasks WHERE id = ?', [id]);
  return true;
};
