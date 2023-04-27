import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/user/dtos/ICreateUserDTO';
import { User } from '../entities/User';

export class UserRepository implements IUserRepository {
  private static repository: Repository<User>;

  constructor(data_source: DataSource) {
    if (!UserRepository.repository) {
      UserRepository.repository = data_source.getRepository(User);
    }
  }

  async create(user: ICreateUserDTO): Promise<User> {
    const newUser = UserRepository.repository.create(user);

    return UserRepository.repository.save(newUser);
  }

  async findByEmail(email: string): Promise<User> {
    return UserRepository.repository.findOneBy({ email });
  }
}
