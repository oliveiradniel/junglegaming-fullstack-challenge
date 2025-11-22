import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { UsersTasksService } from './users-tasks.service';

import { CreateUserTaskData, UserTask } from '@challenge/shared';

@Controller('users-tasks')
export class UsersTasksController {
  constructor(private readonly usersTasksService: UsersTasksService) {}

  @Get('list-users/:taskId')
  listUsersByTaskId(@Param('taskId') taskId: string): Promise<UserTask[]> {
    return this.usersTasksService.listUsersByTaskId(taskId);
  }

  @Post()
  create(@Body() createUserTaskData: CreateUserTaskData): Promise<UserTask> {
    const { taskId, userId } = createUserTaskData;

    return this.usersTasksService.create({ taskId, userId });
  }
}
