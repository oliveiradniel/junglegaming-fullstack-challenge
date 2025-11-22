import { DataSource } from 'typeorm';

import { config } from 'dotenv';

import { UserEntity } from './entities/user.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [UserEntity],
  migrations: ['src/database/orm/migrations/*.{ts,js}'],
  synchronize: false,
});
