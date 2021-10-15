import { Request, response, Response } from 'express';
import CreateComplimentService from '../services/CreateComplimentService';

class CreateComplimentController {
  async Handle(request: Request, response: Response) {
    const { tag_id, user_sender, user_receiver, message } = request.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.Execute({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    console.log(compliment);

    return response.json(compliment);
  }
}

export default CreateComplimentController;
