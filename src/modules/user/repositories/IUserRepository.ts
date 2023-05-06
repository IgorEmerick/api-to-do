import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface IUserRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByEmails(emails: string[]): Promise<User[]>;
  findById(id: string): Promise<User>;
}
