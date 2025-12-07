import { Module } from '@nestjs/common';
import { GatewayModule } from 'src/gateway/gateway.module';

import { TaskAuditLogListenerController } from './task-audit-log-listener.controller';

@Module({
  imports: [GatewayModule],
  controllers: [TaskAuditLogListenerController],
})
export class TaskAuditLogListenerModule {}
