import { TaskAuditLogEntity } from 'src/database/orm/entities/task-audit-logs.entity';

import { TaskAuditLog } from '@challenge/shared';

export class TaskAuditLogMapper {
  static toDomain(entity: TaskAuditLogEntity): TaskAuditLog {
    return {
      id: entity.id,
      taskId: entity.taskId,
      userId: entity.userId,
      taskTitle: entity.taskTitle,
      fieldName: entity.fieldName,
      action: entity.action,
      oldValue: entity.oldValue,
      newValue: entity.newValue,
      changedAt: entity.changedAt,
    };
  }

  static toDomainList(entities: TaskAuditLogEntity[]): TaskAuditLog[] {
    return entities.map(this.toDomain);
  }

  static toEntity(domain: TaskAuditLog): TaskAuditLogEntity {
    return {
      id: domain.id,
      taskId: domain.taskId,
      userId: domain.userId,
      taskTitle: domain.taskTitle,
      fieldName: domain.fieldName,
      action: domain.action,
      oldValue: domain.oldValue,
      newValue: domain.newValue,
      changedAt: domain.changedAt,
    };
  }
}
