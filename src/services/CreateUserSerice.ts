import { getCustomRepository } from 'typeorm';
import ErrorResponse from '../utils/ErrorResponse';
import { hash } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';

interface IUserRequest {
  username: string;
  cpf: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

class CreateUserService {
  async Execute({
    username,
    cpf,
    email,
    isAdmin = false,
    password,
  }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new ErrorResponse(411, 'Email is empty');
    }
    if (!cpf) {
      throw new ErrorResponse(411, 'CPF is empty');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new ErrorResponse(409, 'User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      username,
      email,
      cpf,
      isAdmin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
