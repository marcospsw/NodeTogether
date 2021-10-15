import { getCustomRepository } from 'typeorm';
import ComplimentsRepository from '../repositories/ComplimentsRepository';
import UsersRepository from '../repositories/UsersRepository';
import ErrorResponse from '../utils/ErrorResponse';

interface ICreateCompliment {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async Execute({
    tag_id,
    user_receiver,
    user_sender,
    message,
  }: ICreateCompliment) {
    const complimentsRepository = getCustomRepository(ComplimentsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    if (user_sender === user_receiver) {
      throw new ErrorResponse(400, "Don't be stupid");
    }

    const userReceiveExists = await usersRepository.findOne(user_receiver);
    if (!userReceiveExists) {
      throw new ErrorResponse(404, 'User Receiver not exists');
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export default CreateComplimentService;
