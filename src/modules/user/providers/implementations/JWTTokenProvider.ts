import { sign } from 'jsonwebtoken';
import { IGenerateTokenDTO } from '../../dtos/IGenerateTokenDTO';
import { ITokenProvider } from '../models/ITokenProvider';

export class JWTTokenProvider implements ITokenProvider {
  async generateToken({
    duration,
    payload,
  }: IGenerateTokenDTO): Promise<string> {
    return sign(payload, process.env.AUTHENTICATION_SECRET, {
      expiresIn: duration,
    });
  }
}
