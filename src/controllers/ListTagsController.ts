import { Request, Response } from 'express';
import ListTagsService from '../services/ListTagsService';

class ListTagsController {
  async Handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.Execute();

    return response.json(tags);
  }
}

export default ListTagsController;
