import { Project } from 'src/modules/project/infra/typeorm/entities/Project';
import { ProjectMember } from 'src/modules/project/infra/typeorm/entities/ProjectMember';
import { User } from 'src/modules/user/infra/typeorm/entities/User';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'to-do',
  synchronize: false,
  entities: [User, Project, ProjectMember],
});
