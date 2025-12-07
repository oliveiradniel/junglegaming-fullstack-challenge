import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TaskNotificationsListenerModule } from './modules/task-notifications-listener/task-notifications-listener.module';
import { TaskAuditLogListenerModule } from './modules/task-audit-log-listener/task-notifications-listener.module';

import { configModuleOptions } from './shared/modules-config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TaskNotificationsListenerModule,
    TaskAuditLogListenerModule,
  ],
})
export class AppModule {}
