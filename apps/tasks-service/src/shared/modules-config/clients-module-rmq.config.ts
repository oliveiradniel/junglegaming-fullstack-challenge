import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { getConfig } from '../config/config.helper';

import { NOTIFICATIONS_SERVICE_RMQ } from '../constants/tokens';

export const taskNotificationsRMQClientConfig: ClientsModuleAsyncOptions = [
  {
    name: NOTIFICATIONS_SERVICE_RMQ,
    inject: [ConfigService],

    useFactory: async (configService: ConfigService) => {
      const { BROKER_URL } = getConfig(configService);

      return {
        transport: Transport.RMQ,
        options: {
          urls: [`${BROKER_URL}`],
          queue: 'tasks-queue',
          queueOptions: { durable: true },
        },
      };
    },
  },
];
