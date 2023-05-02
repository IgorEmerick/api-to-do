import { config } from 'dotenv';
import { User } from 'src/modules/user/infra/typeorm/entities/User';
import { DataSource } from 'typeorm';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'to-do',
  synchronize: false,
  entities: [User],
});
