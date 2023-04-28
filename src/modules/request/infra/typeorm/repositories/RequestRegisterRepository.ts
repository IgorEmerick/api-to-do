import { DataSource, Repository } from 'typeorm';
import { RequestRegister } from '../entities/RequestRegister';
import { ICreateRequestRegisterDTO } from '../../../dtos/ICreateRequestRegisterDTO';
import { IRequestRegisterRepository } from '../../../repositories/IRequestRegisterRepository';

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
