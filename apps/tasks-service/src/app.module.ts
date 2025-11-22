import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TaskAuditLogsModule } from './modules/task-audit-logs/task-audit-logs.module';

import { configModuleOptions } from './shared/modules-config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    DatabaseModule,
    TasksModule,
    CommentsModule,
    TaskAuditLogsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
