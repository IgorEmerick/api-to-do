export interface ICreateRequestRegisterDTO {
  origin_ip: string;
  agent: string;
  user_id?: string;
  path: string;
  method: string;
  path_params?: string;
  query_params?: string;
  header: string;
  body?: string;
  response_status?: number;
  response_body?: string;
}
