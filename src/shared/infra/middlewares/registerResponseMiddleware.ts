import { IMiddyRequestDTO } from '@shared/dtos/IMiddyRequestDTO';
import { ensureDataSourceInitialization } from '@shared/utils/ensureDataSourceInitialization';
import { RequestRegisterRepository } from '@modules/request/infra/typeorm/repositories/RequestRegisterRepository';
import { DeveloperDataSource } from '../typeorm/data_sources/DeveloperDataSource';

export const registerResponseMiddleware = async ({
  event: { headers },
  response,
}: IMiddyRequestDTO): Promise<void> => {
  await ensureDataSourceInitialization(DeveloperDataSource);

  const requestRegisterRepository = new RequestRegisterRepository(
    DeveloperDataSource,
  );

  const register = await requestRegisterRepository.findById(
    headers.request_register_id,
  );

  await requestRegisterRepository.update({
    ...register,
    user_id: headers.user_id,
    response_status: response.statusCode,
    response_body: response.body,
  });
};
