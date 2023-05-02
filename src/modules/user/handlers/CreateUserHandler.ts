import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DeveloperDataSource } from 'src/shared/infra/typeorm/data_sources/DeveloperDataSource';
import { ensureDataSourceInitialization } from 'src/shared/utils/ensureDataSourceInitialization';
import { BCryptHashProvider } from 'src/shared/providers/implementations/BCryptHashProvider';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { CreateUserService } from '../services/CreateUserService';

export const handle = async ({
  body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await ensureDataSourceInitialization(DeveloperDataSource);

  const userRepository = new UserRepository(DeveloperDataSource);

  const hashProvider = new BCryptHashProvider();

  const createUserService = new CreateUserService(userRepository, hashProvider);

  const { email, name, password } = JSON.parse(body);

  await createUserService.execute({ email, name, password });

  return { statusCode: 201, body: undefined };
};
