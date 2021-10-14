import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';

interface IUserRequest {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

class CreateUserService {
  async Execute({ username, email, isAdmin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!username) {
      throw new Error('Email is empty');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      return {
        error: 'User already exists',
      };
    }

    const user = usersRepository.create({
      username,
      email,
      isAdmin,
      password,
    });

    usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
