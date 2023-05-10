import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppDataSource } from 'src/shared/infra/typeorm/data_sources/AppDataSource';
import { ensureDataSourceInitialization } from 'src/shared/utils/ensureDataSourceInitialization';
import middy from '@middy/core';
import { ensureAuthentication } from 'src/shared/infra/middlewares/ensureAuthentication';
import { ProjectMemberRepository } from '../infra/typeorm/repositories/ProjectMemberRepository';
import { ListProjectService } from '../services/ListProjectService';

const listProjectHandler = async ({
  headers,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await ensureDataSourceInitialization(AppDataSource);

  const projectMemberRepository = new ProjectMemberRepository(AppDataSource);

  const listProjectService = new ListProjectService(projectMemberRepository);

  const { user_id } = headers;

  const projects = await listProjectService.execute({ user_id });

  return { statusCode: 200, body: JSON.stringify({ projects }) };
};

export const handle = middy(listProjectHandler).use({
  before: ensureAuthentication,
});
