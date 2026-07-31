import * as TaskService from './task.service';
import * as database from '../database';

// Mock the database module
jest.mock('../database', () => ({
  getDB: jest.fn()
}));

describe('TaskService', () => {
  const mockDb = {
    all: jest.fn(),
    get: jest.fn(),
    run: jest.fn()
  };

  beforeEach(() => {
    (database.getDB as jest.Mock).mockReturnValue(mockDb);
    jest.clearAllMocks();
  });

  describe('getAllTasks', () => {
    it('should return all tasks ordered by createdAt DESC', async () => {
      const mockTasks = [
        { id: 2, title: 'Task 2', status: 'done' },
        { id: 1, title: 'Task 1', status: 'pending' }
      ];
      mockDb.all.mockResolvedValue(mockTasks);

      const tasks = await TaskService.getAllTasks();

      expect(mockDb.all).toHaveBeenCalledWith('SELECT * FROM tasks ORDER BY createdAt DESC');
      expect(tasks).toEqual(mockTasks);
    });
  });

  describe('getTaskById', () => {
    it('should return a task if found', async () => {
      const mockTask = { id: 1, title: 'Task 1' };
      mockDb.get.mockResolvedValue(mockTask);

      const task = await TaskService.getTaskById(1);

      expect(mockDb.get).toHaveBeenCalledWith('SELECT * FROM tasks WHERE id = ?', [1]);
      expect(task).toEqual(mockTask);
    });

    it('should return undefined if not found', async () => {
      mockDb.get.mockResolvedValue(undefined);

      const task = await TaskService.getTaskById(99);

      expect(task).toBeUndefined();
    });
  });

  describe('createTask', () => {
    it('should create and return a new task', async () => {
      const newTaskDTO = { title: 'New Task' };
      const createdTask = { id: 1, title: 'New Task', status: 'pending' };
      
      mockDb.run.mockResolvedValue({ lastID: 1 });
      mockDb.get.mockResolvedValue(createdTask);

      const task = await TaskService.createTask(newTaskDTO as any);

      expect(mockDb.run).toHaveBeenCalledWith(
        'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
        ['New Task', null, 'pending']
      );
      expect(task).toEqual(createdTask);
    });
  });

  describe('deleteTask', () => {
    it('should return false if task does not exist', async () => {
      mockDb.get.mockResolvedValue(undefined); // Task not found

      const result = await TaskService.deleteTask(99);

      expect(result).toBe(false);
      expect(mockDb.run).not.toHaveBeenCalled();
    });

    it('should delete and return true if task exists', async () => {
      mockDb.get.mockResolvedValue({ id: 1, title: 'Task' });
      mockDb.run.mockResolvedValue({});

      const result = await TaskService.deleteTask(1);

      expect(mockDb.run).toHaveBeenCalledWith('DELETE FROM tasks WHERE id = ?', [1]);
      expect(result).toBe(true);
    });
  });
});
