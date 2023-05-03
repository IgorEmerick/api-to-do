import { compare, hash } from 'bcryptjs';
import { ICompareHashDTO } from 'src/shared/dtos/ICompareHashDTO';
import { IHashProvider } from '../models/IHashProvider';

export class BCryptHashProvider implements IHashProvider {
  async encrypt(phrase: string): Promise<string> {
    return hash(phrase, 10);
  }

  async compare({ cypher, phrase }: ICompareHashDTO): Promise<boolean> {
    return compare(phrase, cypher);
  }
}
