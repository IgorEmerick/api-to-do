import { User } from '@modules/user/infra/typeorm/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('request_registers')
export class RequestRegister {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'varchar' })
  origin_ip: string;

  @Column({ type: 'varchar' })
  agent: string;

  @Column({ type: 'varchar', nullable: true })
  user_id: string;

  @ManyToOne(() => User, user => user.requests)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'varchar' })
  method: string;

  @Column({ type: 'varchar', nullable: true })
  path_params: string;

  @Column({ type: 'varchar', nullable: true })
  query_params: string;

  @Column({ type: 'varchar' })
  header: string;

  @Column({ type: 'varchar', nullable: true })
  body: string;

  @Column({ type: 'int', nullable: true })
  response_status: number;

  @Column({ type: 'varchar', nullable: true })
  response_body: string;
}
