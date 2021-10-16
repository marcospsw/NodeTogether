import { Request, Response } from 'express';
import ListUserSenderComplimentsService from '../services/ListUserSenderCompliments';

class ListUserSenderComplimentsController {
  async Handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSenderComplimentsService = new ListUserSenderComplimentsService();

    const compliments = await listUserSenderComplimentsService.Execute(user_id);

    return response.json(compliments);
  }
}

export default ListUserSenderComplimentsController;
