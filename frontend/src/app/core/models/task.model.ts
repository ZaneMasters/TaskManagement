export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;
