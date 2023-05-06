import { validateEmail } from 'src/shared/utils/validateEmail';
import { validateName } from 'src/shared/utils/validateName';
import { validateUuid } from 'src/shared/utils/validateUuid';
import { HttpError } from 'src/shared/errors/HttpError';
import { IUserRepository } from 'src/modules/user/repositories/IUserRepository';
import { Project } from '../infra/typeorm/entities/Project';
import { IProjectRepository } from '../repositories/IProjectRepository';
import { IProjectMemberRepository } from '../repositories/IProjectMemberRepository';
import { ICreateProjectMemberDTO } from '../dtos/ICreateProjectMemberDTO';

interface IMember {
  email: string;
  permission: 'VIEW' | 'EDIT' | 'ADMIN';
}

interface IRequest {
  admin_id: string;
  name: string;
  members?: IMember[];
}

export class CreateProjectService {
  constructor(
    private projectRepository: IProjectRepository,
    private projectMemberRepository: IProjectMemberRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({ name, admin_id, members }: IRequest): Promise<Project> {
    const invalidMember =
      members && members.find(member => !validateEmail(member.email));

    if (invalidMember || !validateName(name) || !validateUuid(admin_id)) {
      throw new HttpError(400, 'Invalida params!');
    }

    const project = await this.projectRepository.create({ name });

    const membersEmails = members && members.map(member => member.email);

    const databaseMembers =
      members && (await this.userRepository.findByEmails(membersEmails));

    const createMembers = members
      ? databaseMembers.map<ICreateProjectMemberDTO>(databaseMember => {
          const member = members.find(
            foundMember => foundMember.email === databaseMember.email,
          );

          return {
            permission: member.permission,
            project_id: project.id,
            user_id: databaseMember.id,
          };
        })
      : [];

    createMembers.push({
      permission: 'ADMIN',
      project_id: project.id,
      user_id: admin_id,
    });

    project.members = await this.projectMemberRepository.createMany(
      createMembers,
    );

    return project;
  }
}
