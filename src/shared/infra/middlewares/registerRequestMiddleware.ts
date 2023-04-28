import { RequestRegisterRepository } from '../../../modules/request/infra/typeorm/repositories/RequestRegisterRepository';
import { IMiddyRequestDTO } from '../../dtos/IMiddyRequestDTO';
import { ensureDataSourceInitialization } from '../../utils/ensureDataSourceInitialization';
import { DeveloperDataSource } from '../typeorm/data_sources/DeveloperDataSource';

export const registerRequestMiddleware = async ({
  event: {
    body,
    headers,
    httpMethod,
    requestContext: {
      identity: { sourceIp, userAgent },
      resourcePath,
    },
    pathParameters,
    queryStringParameters,
  },
}: IMiddyRequestDTO): Promise<void> => {
  await ensureDataSourceInitialization(DeveloperDataSource);

  const requestRegisterRepository = new RequestRegisterRepository(
    DeveloperDataSource,
  );

  const register = await requestRegisterRepository.create({
    header: JSON.stringify(headers),
    method: httpMethod,
    origin_ip: sourceIp,
    path: resourcePath,
    body,
    path_params: pathParameters && JSON.stringify(pathParameters),
    query_params:
      queryStringParameters && JSON.stringify(queryStringParameters),
    agent: userAgent,
  });

  headers.request_register_id = register.id;
};
