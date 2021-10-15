import { Request, Response } from 'express';
import CreateTagService from '../services/CreateTagService';

class CreateTagController {
  async Handle(request: Request, response: Response) {
    const { name } = request.body;
    const createTagService = new CreateTagService();

    const tag = await createTagService.Execute(name);

    return response.json(tag);
  }
}

export default CreateTagController;
