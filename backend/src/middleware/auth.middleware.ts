import { Request, Response, NextFunction } from 'express';

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  
  // Simple mock token validation
  if (token !== 'mock-token-123') {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  next();
};
