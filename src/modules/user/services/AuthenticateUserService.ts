import { validateEmail } from 'src/shared/utils/validateEmail';
import { validatePassword } from 'src/shared/utils/validatePassword';
import { HttpError } from 'src/shared/errors/HttpError';
import { IHashProvider } from 'src/shared/providers/models/IHashProvider';
import { IUserRepository } from '../repositories/IUserRepository';
import { ITokenProvider } from '../providers/models/ITokenProvider';

interface IRequest {
  email: string;
  password: string;
  keep_signed: boolean;
}

export class AuthenticateUserService {
  constructor(
    private userRepository: IUserRepository,
    private hashProvider: IHashProvider,
    private tokenProvider: ITokenProvider,
  ) {}

  async execute({ email, keep_signed, password }: IRequest): Promise<string> {
    if (!validateEmail(email) || !validatePassword(password)) {
      throw new HttpError(400, 'Invalid params!');
    }

    const user = await this.userRepository.findByEmail(email);

    if (
      !user ||
      !(await this.hashProvider.compare({
        cypher: user.password,
        phrase: password,
      }))
    ) {
      throw new HttpError(400, 'Invalid params!');
    }

    return this.tokenProvider.generateToken({
      duration: 24 * 60 * 60 * 1000 * (keep_signed ? 30 : 1),
      payload: { ...user, password: undefined },
    });
  }
}
