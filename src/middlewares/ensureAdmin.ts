import { NextFunction, Request, Response } from 'express';

function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const admin = true;

  if (!admin) {
    return response.status(401).json({
      error: 'Unauthorized',
    });
  }

  return next();
}

export default ensureAdmin;
