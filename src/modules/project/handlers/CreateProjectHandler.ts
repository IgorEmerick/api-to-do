import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { AppDataSource } from 'src/shared/infra/typeorm/data_sources/AppDataSource';
import { ensureDataSourceInitialization } from 'src/shared/utils/ensureDataSourceInitialization';
import { UserRepository } from 'src/modules/user/infra/typeorm/repositories/UserRepository';
import middy from '@middy/core';
import { ensureAuthentication } from 'src/shared/infra/middlewares/ensureAuthentication';
import { ProjectRepository } from '../infra/typeorm/repositories/ProjectRepository';
import { ProjectMemberRepository } from '../infra/typeorm/repositories/ProjectMemberRepository';
import { CreateProjectService } from '../services/CreateProjectService';

const createProjectHandler = async ({
  body,
  headers,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await ensureDataSourceInitialization(AppDataSource);

  const projectRepository = new ProjectRepository(AppDataSource);
  const projectMemberRepository = new ProjectMemberRepository(AppDataSource);
  const userRepository = new UserRepository(AppDataSource);

  const createProjectService = new CreateProjectService(
    projectRepository,
    projectMemberRepository,
    userRepository,
  );

  const { user_id } = headers;
  const { name, members } = JSON.parse(body);

  await createProjectService.execute({ admin_id: user_id, name, members });

  return { statusCode: 201, body: undefined };
};

export const handle = middy(createProjectHandler).use({
  before: ensureAuthentication,
});
