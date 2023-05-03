import { IGenerateTokenDTO } from '../../dtos/IGenerateTokenDTO';

export interface ITokenProvider {
  generateToken(options: IGenerateTokenDTO): Promise<string>;
}
