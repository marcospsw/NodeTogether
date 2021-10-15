import { getCustomRepository } from 'typeorm';
import UsersRepositories from '../repositories/UsersRepositories';
import ErrorResponse from '../utils/ErrorResponse';

interface IUserRequest {
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

class CreateUserService {
  async Execute({ username, email, isAdmin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new ErrorResponse(411, 'Email is empty');
    }

    const userAlreadyExists = await usersRepository.findOne({ email });
    if (userAlreadyExists) {
      throw new ErrorResponse(409, 'User already exists');
    }

    const user = usersRepository.create({
      username,
      email,
      isAdmin,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
