import { Request, Response } from 'express';
import ListUsersService from '../services/ListUsersService';

class ListUsersController {
  async Handle(request: Request, response: Response) {
    const listUserService = new ListUsersService();

    const users = await listUserService.Execute();

    return response.json(users);
  }
}

export default ListUsersController;
