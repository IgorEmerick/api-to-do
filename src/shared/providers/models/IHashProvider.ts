import { ICompareHashDTO } from 'src/shared/dtos/ICompareHashDTO';

export interface IHashProvider {
  encrypt(phrase: string): Promise<string>;
  compare(params: ICompareHashDTO): Promise<boolean>;
}
