import { getCustomRepository } from 'typeorm';
import TagsRepository from '../repositories/TagsRepository';
import ErrorResponse from '../utils/ErrorResponse';

class CreateTagService {
  async Execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepository);

    if (!name) {
      throw new ErrorResponse(411, 'Name is empty');
    }

    const tagAlreadyExists = await tagsRepositories.findOne({ name });
    if (tagAlreadyExists) {
      throw new ErrorResponse(409, 'Tag already exists');
    }

    const tag = tagsRepositories.create({ name });

    await tagsRepositories.save(tag);

    return tag;
  }
}

export default CreateTagService;
