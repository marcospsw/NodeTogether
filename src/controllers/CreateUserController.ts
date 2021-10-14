import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserSerice';

class CreateUserController {
  async Handle(request: Request, response: Response) {
    const { username, email, isAdmin, password } = request.body;

    const usersService = new CreateUserService();

    const user = await usersService.Execute({
      username,
      email,
      isAdmin,
      password,
    });

    return response.json(user);
  }
}

export default CreateUserController;
