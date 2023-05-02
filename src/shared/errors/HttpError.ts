export class HttpError {
  public readonly statusCode: number;

  public readonly body: string;

  constructor(status: number, message: string) {
    this.statusCode = status;
    this.body = JSON.stringify({ message });
  }
}
