import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { TaskAuditLogsService } from './task-audit-logs.service';

import {
  ListCreationTaskAuditLogWithAuthorData,
  ListDeletionTaskAuditLogWithAuthorData,
  ListUpdateTaskAuditLogWithAuthorData,
  TaskAuditLog,
} from '@challenge/shared';

@Controller('task-audit-logs')
export class TaskAuditLogsController {
  constructor(private readonly taskAuditLogsService: TaskAuditLogsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  list(): Promise<TaskAuditLog[]> {
    return this.taskAuditLogsService.list();
  }

  @HttpCode(HttpStatus.OK)
  @Get('creation')
  listTaskCreationAuditLog(): Promise<
    ListCreationTaskAuditLogWithAuthorData[]
  > {
    return this.taskAuditLogsService.listTaskCreationAuditLog();
  }

  @HttpCode(HttpStatus.OK)
  @Get('update')
  listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLogWithAuthorData[]> {
    return this.taskAuditLogsService.listTaskUpdateAuditLog();
  }

  @HttpCode(HttpStatus.OK)
  @Get('deletion')
  listTaskDeletionAuditLog(): Promise<
    ListDeletionTaskAuditLogWithAuthorData[]
  > {
    return this.taskAuditLogsService.listTaskDeletionAuditLog();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.taskAuditLogsService.delete(id);
  }
}
