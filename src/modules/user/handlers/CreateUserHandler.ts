import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { BCryptHashProvider } from '../providers/implementations/BCryptHashProvider';
import { CreateUserService } from '../services/CreateUserService';
import { ensureDataSourceInitialization } from '../../../shared/utils/ensureDataSourceInitialization';
import { DeveloperDataSource } from '../../../shared/infra/typeorm/data_sources/DeveloperDataSource';
import { registerRequestMiddleware } from '../../../shared/infra/middlewares/registerRequestMiddleware';
import { registerResponseMiddleware } from '../../../shared/infra/middlewares/registerResponseMiddleware';

const createUserHandler = async ({
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

export const handle = middy(createUserHandler).use({
  before: registerRequestMiddleware,
  after: registerResponseMiddleware,
});
