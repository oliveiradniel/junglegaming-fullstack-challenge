import { DataSourceOptions } from 'typeorm';

import { join } from 'path';

import { getConfig } from '../config/config.helper';

import { UserEntity } from 'src/database/orm/entities/user.entity';

export function typeORMConfigOptions(
  getConfigService: ReturnType<typeof getConfig>,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: getConfigService.POSTGRES_HOST,
    port: getConfigService.POSTGRES_PORT,
    username: getConfigService.POSTGRES_USER,
    password: getConfigService.POSTGRES_PASSWORD,
    database: getConfigService.POSTGRES_DB,
    synchronize: false,
    entities: [UserEntity],
    migrations: [join(__dirname, '/orm/migrations/*.{ts,js}')],
  };
}
