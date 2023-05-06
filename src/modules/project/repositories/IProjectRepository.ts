import { ICreateProjectDTO } from '../dtos/ICreateProjectDTO';
import { Project } from '../infra/typeorm/entities/Project';

export interface IProjectRepository {
  create(project: ICreateProjectDTO): Promise<Project>;
}
