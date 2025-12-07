import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { TaskAuditLogsController } from './task-audit-logs.controller';

import { TaskAuditLogsService } from './task-audit-logs.service';

import { taskNotificationsRMQClientConfig } from 'src/shared/modules-config/clients-module-rmq.config';

@Module({
  imports: [ClientsModule.registerAsync(taskNotificationsRMQClientConfig)],
  controllers: [TaskAuditLogsController],
  providers: [TaskAuditLogsService],
})
export class TaskAuditLogsModule {}
