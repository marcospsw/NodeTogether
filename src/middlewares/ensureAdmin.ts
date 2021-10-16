import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import ErrorResponse from '../utils/ErrorResponse';

async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const usersRepository = getCustomRepository(UsersRepository);
  const { user_id } = request;

  const user = await usersRepository.findOne(user_id);

  if (!user.isAdmin) {
    throw new ErrorResponse(401, 'Unauthorized');
  }

  return next();
}

export default ensureAdmin;
