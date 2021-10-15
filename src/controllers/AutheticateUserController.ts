import { Request, Response } from 'express';
import AutheticateUserService from '../services/AutheticateUserService';
import CreateUserService from '../services/CreateUserSerice';

class AuthenticateUserController {
  async Handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AutheticateUserService();

    const token = await authenticateUserService.Execute({
      email,
      password,
    });

    return response.json(token);
  }
}

export default AuthenticateUserController;
