import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

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
}
