import { CreateTaskAuditLogData } from 'src/modules/task-audit-logs/types/create-task-audit-log-data.type';

import { TaskAuditLog } from '@challenge/shared';

export abstract class ITaskAuditLogsRepository {
  abstract list(): Promise<TaskAuditLog[]>;
  abstract create(data: CreateTaskAuditLogData): Promise<TaskAuditLog>;
}
