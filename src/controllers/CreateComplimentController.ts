import { Request, response, Response } from 'express';
import CreateComplimentService from '../services/CreateComplimentService';

class CreateComplimentController {
  async Handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const { user_id } = request;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.Execute({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}

export default CreateComplimentController;
