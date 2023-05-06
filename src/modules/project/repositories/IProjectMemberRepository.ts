import { ICreateProjectMemberDTO } from '../dtos/ICreateProjectMemberDTO';
import { ProjectMember } from '../infra/typeorm/entities/ProjectMember';

export interface IProjectMemberRepository {
  createMany(
    project_members: ICreateProjectMemberDTO[],
  ): Promise<ProjectMember[]>;
}
