import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { TasksModule } from '../tasks/tasks.module';
import { UsersTasksModule } from '../users-tasks/users-tasks.module';

import { CommentsController } from './comments.controller';

import { CommentsService } from './comments.service';

import { taskNotificationsRMQClientConfig } from 'src/shared/modules-config/clients-module-rmq.config';

@Module({
  imports: [
    ClientsModule.registerAsync(taskNotificationsRMQClientConfig),
    TasksModule,
    UsersTasksModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
