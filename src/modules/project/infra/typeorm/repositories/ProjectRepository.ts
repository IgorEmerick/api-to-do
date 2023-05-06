import { IProjectRepository } from 'src/modules/project/repositories/IProjectRepository';
import { DataSource, Repository } from 'typeorm';
import { ICreateProjectDTO } from 'src/modules/project/dtos/ICreateProjectDTO';
import { Project } from '../entities/Project';

export class ProjectRepository implements IProjectRepository {
  private static repository: Repository<Project>;

  constructor(data_source: DataSource) {
    if (!ProjectRepository.repository) {
      ProjectRepository.repository = data_source.getTreeRepository(Project);
    }
  }

  async create(project: ICreateProjectDTO): Promise<Project> {
    const newProject = ProjectRepository.repository.create(project);

    return ProjectRepository.repository.save(newProject);
  }
}
