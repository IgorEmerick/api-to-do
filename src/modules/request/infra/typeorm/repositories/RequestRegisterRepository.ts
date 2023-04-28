import { IRequestRegisterRepository } from '@modules/request/repositories/IRequestRegisterRepository';
import { DataSource, Repository } from 'typeorm';
import { ICreateRequestRegisterDTO } from '@modules/request/dtos/ICreateRequestRegisterDTO';
import { RequestRegister } from '../entities/RequestRegister';

export class RequestRegisterRepository implements IRequestRegisterRepository {
  private static repository: Repository<RequestRegister>;

  constructor(data_source: DataSource) {
    if (!RequestRegisterRepository.repository) {
      RequestRegisterRepository.repository =
        data_source.getRepository(RequestRegister);
    }
  }

  async create(
    request_register: ICreateRequestRegisterDTO,
  ): Promise<RequestRegister> {
    const requestRegister =
      RequestRegisterRepository.repository.create(request_register);

    return RequestRegisterRepository.repository.save(requestRegister);
  }

  async update(request_register: RequestRegister): Promise<RequestRegister> {
    return RequestRegisterRepository.repository.save(request_register);
  }

  async findById(id: string): Promise<RequestRegister> {
    return RequestRegisterRepository.repository.findOneBy({ id });
  }
}
