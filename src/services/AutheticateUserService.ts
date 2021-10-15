import { getCustomRepository } from 'typeorm';
import ErrorResponse from '../utils/ErrorResponse';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';

interface IAtheticateUserService {
  email: string;
  password: string;
}

class AutheticateUserService {
  async Execute({ email, password }) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ email });
    if (!user) {
      throw new ErrorResponse(409, 'Email/Password incorrect');
    }

    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new ErrorResponse(409, 'Email/Password incorrect');
    }

    const token = sign(
      { email: user.email },
      'eedecf40-9f53-4bd3-a923-e3c650ec0a36',
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return token;
  }
}

export default AutheticateUserService;
