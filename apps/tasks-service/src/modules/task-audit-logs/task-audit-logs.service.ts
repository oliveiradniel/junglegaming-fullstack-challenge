import { Inject, Injectable } from '@nestjs/common';

import type { ITaskAuditLogsRepository } from 'src/database/contracts/task-audit-logs.contract';

import { CreateTaskAuditLogData } from './types/create-task-audit-log-data.type';

import { TASK_AUDIT_LOGS_REPOSITORY } from 'src/shared/constants/tokens';

import { TaskAuditLog } from '@challenge/shared';

@Injectable()
export class TaskAuditLogsService {
  constructor(
    @Inject(TASK_AUDIT_LOGS_REPOSITORY)
    private readonly taskAuditLogsRepository: ITaskAuditLogsRepository,
  ) {}

  list(): Promise<TaskAuditLog[]> {
    return this.taskAuditLogsRepository.list();
  }

  create(data: CreateTaskAuditLogData): Promise<TaskAuditLog> {
    const { action, taskId, userId, taskTitle, oldValue, newValue, fieldName } =
      data;

    return this.taskAuditLogsRepository.create({
      action,
      taskId,
      userId,
      taskTitle,
      oldValue,
      newValue,
      fieldName,
    });
  }
}
