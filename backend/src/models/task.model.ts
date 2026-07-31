export type TaskStatus = 'pending' | 'in_progress' | 'done';

export interface Task {
  id: string; // or number depending on DB, but spec says "identificador único", UUID is good but SQLite auto-increment is easier. Let's use string (UUID) or number. Let's stick to number since it's sqlite auto-increment. No, let's use string UUID for better distributed systems practice, or just let DB generate it. Actually, I will use string to be safe. Wait, SQLite auto increment gives integers. Let's use number.
  // Wait, let's use string id in TS, and INTEGER PRIMARY KEY AUTOINCREMENT in SQLite and convert to string. Actually, let's just use number for simplicity.
}

// Redefining interface cleanly:
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string; // ISO String
  updatedAt: string; // ISO String
}

export type CreateTaskDTO = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;
