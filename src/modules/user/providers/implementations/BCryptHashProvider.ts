import { hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  async encrypt(phrase: string): Promise<string> {
    return hash(phrase, 10);
  }
}
