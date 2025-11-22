import { ConfigService } from '@nestjs/config';

import { IConfig } from './config.interface';

export function getConfig(configService: ConfigService): IConfig {
  return {
    PORT: configService.get<number>('PORT')!,
    POSTGRES_PASSWORD: configService.get<string>('POSTGRES_PASSWORD')!,
    POSTGRES_USER: configService.get<string>('POSTGRES_USER')!,
    POSTGRES_DB: configService.get<string>('POSTGRES_DB')!,
    POSTGRES_HOST: configService.get<string>('POSTGRES_HOST')!,
    POSTGRES_PORT: configService.get<number>('POSTGRES_PORT')!,
    FRONTEND_ORIGIN: configService.get<string>('FRONTEND_ORIGIN')!,
    BROKER_URL: configService.get<string>('BROKER_URL')!,
  };
}
