import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppDataSource } from 'src/shared/infra/typeorm/data_sources/AppDataSource';
import { ensureDataSourceInitialization } from 'src/shared/utils/ensureDataSourceInitialization';
import { BCryptHashProvider } from 'src/shared/providers/implementations/BCryptHashProvider';
import { UserRepository } from '../infra/typeorm/repositories/UserRepository';
import { JWTTokenProvider } from '../providers/implementations/JWTTokenProvider';
import { AuthenticateUserService } from '../services/AuthenticateUserService';

export const handle = async ({
  body,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await ensureDataSourceInitialization(AppDataSource);

  const userRepository = new UserRepository(AppDataSource);

  const hashProvider = new BCryptHashProvider();
  const tokenProvider = new JWTTokenProvider();

  const authenticateUserService = new AuthenticateUserService(
    userRepository,
    hashProvider,
    tokenProvider,
  );

  const { email, keep_signed, password } = JSON.parse(body);

  const token = await authenticateUserService.execute({
    email,
    keep_signed,
    password,
  });

  return { statusCode: 200, body: JSON.stringify({ token }) };
};
