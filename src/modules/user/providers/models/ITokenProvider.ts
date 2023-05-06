import { IGenerateTokenDTO } from '../../dtos/IGenerateTokenDTO';

export interface ITokenProvider {
  generateToken(options: IGenerateTokenDTO): Promise<string>;
  decodeToken(token: string): Promise<object>;
}
