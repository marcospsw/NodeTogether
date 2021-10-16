import { Request, Response } from 'express';
import ListUserReceiverComplimentsService from '../services/ListUserReceiverCompliments';

class ListUserReceiverComplimentsController {
  async Handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceiverComplimentsService = new ListUserReceiverComplimentsService();

    const compliments = await listUserReceiverComplimentsService.Execute(user_id);

    return response.json(compliments);
  }
}

export default ListUserReceiverComplimentsController;
