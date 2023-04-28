import { ICreateRequestRegisterDTO } from '../dtos/ICreateRequestRegisterDTO';
import { RequestRegister } from '../infra/typeorm/entities/RequestRegister';

export interface IRequestRegisterRepository {
  create(request_register: ICreateRequestRegisterDTO): Promise<RequestRegister>;
  update(request_register: RequestRegister): Promise<RequestRegister>;
  findById(id: string): Promise<RequestRegister>;
}
