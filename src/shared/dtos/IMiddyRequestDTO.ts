import { APIGatewayProxyEvent, Context } from 'aws-lambda';

export interface IMiddyRequestDTO {
  event: APIGatewayProxyEvent;
  context: Context;
  response?: { statusCode: number; body: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}
