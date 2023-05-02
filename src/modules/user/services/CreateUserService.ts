import { validateEmail } from 'src/shared/utils/validateEmail';
import { validateName } from 'src/shared/utils/validateName';
import { validatePassword } from 'src/shared/utils/validatePassword';
import { HttpError } from 'src/shared/errors/HttpError';
import { IHashProvider } from 'src/shared/providers/models/IHashProvider';
import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, name, password }: IRequest): Promise<User> {
    if (
      !validateEmail(email) ||
      !validateName(name) ||
      !validatePassword(password)
    ) {
      throw new HttpError(400, 'Invalid params!');
    }

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new HttpError(400, 'User already exists!');
    }

    const passwordCypher = await this.hashProvider.encrypt(password);

    return this.userRepository.create({
      email,
      name,
      password: passwordCypher,
    });
  }
}
