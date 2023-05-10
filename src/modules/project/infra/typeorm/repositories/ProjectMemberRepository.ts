import { IProjectMemberRepository } from 'src/modules/project/repositories/IProjectMemberRepository';
import { DataSource, Repository } from 'typeorm';
import { ICreateProjectMemberDTO } from 'src/modules/project/dtos/ICreateProjectMemberDTO';
import { ProjectMember } from '../entities/ProjectMember';

export class ProjectMemberRepository implements IProjectMemberRepository {
  public static repository: Repository<ProjectMember>;

  constructor(data_source: DataSource) {
    if (!ProjectMemberRepository.repository) {
      ProjectMemberRepository.repository =
        data_source.getRepository(ProjectMember);
    }
  }

  async createMany(
    project_members: ICreateProjectMemberDTO[],
  ): Promise<ProjectMember[]> {
    const projectMembers =
      ProjectMemberRepository.repository.create(project_members);

    return ProjectMemberRepository.repository.save(projectMembers);
  }

  async findWithProjectByUserId(user_id: string): Promise<ProjectMember[]> {
    return ProjectMemberRepository.repository.find({
      relations: { project: true },
      where: { user_id },
    });
  }
}
