import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }).min(1, 'Title must not be empty').max(100, 'Title must not exceed 100 characters'),
  
  description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
  
  status: z.enum(['pending', 'in_progress', 'done'], {
    errorMap: () => ({ message: "Status must be 'pending', 'in_progress' or 'done'" })
  })
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title must not be empty').max(100, 'Title must not exceed 100 characters').optional(),
  description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
  status: z.enum(['pending', 'in_progress', 'done']).optional()
});
