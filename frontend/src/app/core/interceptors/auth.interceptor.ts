import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Simple mock token to pass basic auth requirement
  const authToken = 'mock-token-123';
  
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  
  return next(authReq);
};
