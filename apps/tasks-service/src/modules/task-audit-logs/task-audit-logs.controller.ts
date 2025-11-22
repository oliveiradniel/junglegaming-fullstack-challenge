import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

import { TaskAuditLogsService } from './task-audit-logs.service';

import { TaskAuditLog } from '@challenge/shared';

@Controller('task-audit-logs')
export class TaskAuditLogsController {
  constructor(private readonly taskAuditLogsService: TaskAuditLogsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  list(): Promise<TaskAuditLog[]> {
    return this.taskAuditLogsService.list();
  }

  // @HttpCode(HttpStatus.OK)
  // @Get()
  // list(
  //   @Query() queryParams: TaskAuditLogFiltersQueryParam,
  // ): Promise<TaskAuditLog[]> {
  //   const { taskId, userId, fieldName } = queryParams;

  //   return this.taskAuditLogsService.list({
  //     task: taskId ? { id: taskId } : undefined,
  //     userId,
  //     fieldName,
  //   });
  // }
}
