import { JWTTokenProvider } from 'src/modules/user/providers/implementations/JWTTokenProvider';
import { IMiddyRequestDTO } from 'src/shared/dtos/IMiddyRequestDTO';
import { HttpError } from 'src/shared/errors/HttpError';
import { ensureDataSourceInitialization } from 'src/shared/utils/ensureDataSourceInitialization';
import { UserRepository } from 'src/modules/user/infra/typeorm/repositories/UserRepository';
import { User } from 'src/modules/user/infra/typeorm/entities/User';
import { AppDataSource } from '../typeorm/data_sources/AppDataSource';

export const ensureAuthentication = async ({
  event: { headers },
}: IMiddyRequestDTO): Promise<void> => {
  const { Authorization } = headers;

  console.log(Authorization[0]);

  const [, token] = Authorization.split('Bearer ');

  const tokenProvider = new JWTTokenProvider();

  let payload: User;

  try {
    payload = (await tokenProvider.decodeToken(token)) as User;
  } catch (error) {
    throw new HttpError(401, 'Invalid authentication!');
  }

  await ensureDataSourceInitialization(AppDataSource);

  const userRepository = new UserRepository(AppDataSource);

  const user = await userRepository.findById(payload.id);

  if (!user) {
    throw new HttpError(401, 'Invalid authentication!');
  }

  headers.user_id = payload.id;
};
