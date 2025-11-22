import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { getConfig } from '../shared/config/config.helper';
import { typeORMConfigOptions } from '../shared/modules-config/typeorm-config';

import { UserEntity } from './orm/entities/user.entity';
import { UsersRepository } from './orm/repositories/users.repository';

import { USERS_REPOSITORY } from 'src/shared/constants/tokens';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const getConfigService = getConfig(configService);

        return typeORMConfigOptions(getConfigService);
      },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [{ provide: USERS_REPOSITORY, useClass: UsersRepository }],
  exports: [TypeOrmModule, USERS_REPOSITORY],
})
export class DatabaseModule {}
