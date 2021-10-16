import { NextFunction, Request, Response } from 'express';
import ErrorResponse from '../utils/ErrorResponse';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

function ensureAuthetenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    throw new ErrorResponse(401, 'Token missing');
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, 'eedecf40-9f53-4bd3-a923-e3c650ec0a36') as IPayload;
    request.user_id = sub;

    return next();
  } catch (error) {
    throw new ErrorResponse(400, 'Invalid token');
  }
}

export default ensureAuthetenticated;
