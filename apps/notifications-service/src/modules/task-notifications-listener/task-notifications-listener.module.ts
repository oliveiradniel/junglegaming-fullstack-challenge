import { Module } from '@nestjs/common';
import { GatewayModule } from 'src/gateway/gateway.module';

import { TaskNotificationListenerController } from './task-notifications-listener.controller';

@Module({
  imports: [GatewayModule],
  controllers: [TaskNotificationListenerController],
})
export class TaskNotificationsListenerModule {}
