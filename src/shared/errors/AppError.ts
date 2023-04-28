export class AppError {
  public readonly body: string;

  public readonly statusCode: number;

  constructor(status: number, message: string) {
    this.body = JSON.stringify({ message });
    this.statusCode = status;
  }
}
