import {
  AssignedToTaskNotificationPayload,
  DeletedTaskNotificationPayload,
  NewCommentNotificationPayload,
  Task,
  UpdatedTaskNotificationPayload,
  UpdatedTaskPriorityNotificationPayload,
  UpdatedTaskStatusNotificationPayload,
} from '@challenge/shared';

export type TaskNotificationType =
  | 'task:created'
  | 'task:updated'
  | 'task:assigned'
  | 'task:status'
  | 'task:priority'
  | 'task:deleted'
  | 'comment:new';

export interface NotifyUser {
  event: TaskNotificationType;
  userId: string;
  data:
    | Task
    | UpdatedTaskNotificationPayload
    | AssignedToTaskNotificationPayload
    | NewCommentNotificationPayload
    | UpdatedTaskStatusNotificationPayload
    | UpdatedTaskPriorityNotificationPayload
    | DeletedTaskNotificationPayload
    | null;
}

export interface NotifyCreatedTask {
  data: Task;
}

export interface NotifyUpdatedTask {
  data: UpdatedTaskNotificationPayload;
}

export interface NotifyUpdatedTaskStatus {
  data: UpdatedTaskStatusNotificationPayload;
}

export interface NotifyUpdatedTaskPriority {
  data: UpdatedTaskPriorityNotificationPayload;
}

export interface NotifyDeletedTask {
  data: DeletedTaskNotificationPayload;
}

export interface NotifyAssignedTask {
  data: AssignedToTaskNotificationPayload;
}

export interface NotifyNewComment {
  data: NewCommentNotificationPayload;
}
