export interface IHashProvider {
  encrypt(phrase: string): Promise<string>;
}
