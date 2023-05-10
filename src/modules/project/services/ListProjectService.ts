import { Project } from '../infra/typeorm/entities/Project';
import { IProjectMemberRepository } from '../repositories/IProjectMemberRepository';

interface IRequest {
  user_id: string;
}

export class ListProjectService {
  constructor(private projectMemberRepository: IProjectMemberRepository) {}

  async execute({ user_id }: IRequest): Promise<Project[]> {
    const projectMembers =
      await this.projectMemberRepository.findWithProjectByUserId(user_id);

    const projects = projectMembers.map(projectMember => projectMember.project);

    return projects;
  }
}
