import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { IHashProvider } from '../providers/models/IHashProvider';
import { validateEmail } from '../../../shared/utils/validateEmail';
import { validateName } from '../../../shared/utils/validateName';
import { validatePassword } from '../../../shared/utils/validatePassword';
import { AppError } from '../../../shared/errors/AppError';

export class CreateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, name, password }: ICreateUserDTO): Promise<User> {
    if (
      !validateEmail(email) ||
      !validateName(name) ||
      !validatePassword(password)
    ) {
      throw new AppError(400, 'Invalid params!');
    }

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new AppError(400, 'Already exists an user with this email!');
    }

    const encryptedPassword = await this.hashProvider.encrypt(password);

    return this.userRepository.create({
      email,
      name,
      password: encryptedPassword,
    });
  }
}
