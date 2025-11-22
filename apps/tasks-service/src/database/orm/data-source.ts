import { DataSource } from 'typeorm';

import { config } from 'dotenv';

import { TaskEntity } from './entities/task.entity';
import { CommentEntity } from './entities/comment.entity';
import { UserTaskEntity } from './entities/users-tasks.entity';
import { TaskAuditLogEntity } from './entities/task-audit-logs.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [TaskEntity, CommentEntity, UserTaskEntity, TaskAuditLogEntity],
  migrations: ['src/database/orm/migrations/*.{ts,js}'],
  synchronize: false,
  logging: ['query', 'error'],
});
