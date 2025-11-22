import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { NotificationsGateway } from 'src/gateway/notifications.gateway';

import {
  AssignedToTaskNotificationPayload,
  DeletedTaskNotificationPayload,
  NewCommentNotificationPayload,
  Task,
  UpdatedTaskNotificationPayload,
  UpdatedTaskPriorityNotificationPayload,
  UpdatedTaskStatusNotificationPayload,
} from '@challenge/shared';

@Controller()
export class TaskNotificationListenerController {
  constructor(private readonly notificationsGateway: NotificationsGateway) {}

  @EventPattern('task.created')
  onTaskCreated(@Payload() task: Task) {
    this.notificationsGateway.notifyCreatedTask({ data: task });
  }

  @EventPattern('task.updated')
  onTaskUpdated(@Payload() payload: UpdatedTaskNotificationPayload) {
    this.notificationsGateway.notifyUpdatedTask({
      data: payload,
    });
  }

  @EventPattern('task.status')
  onTaskUpdatedStatus(
    @Payload()
    payload: UpdatedTaskStatusNotificationPayload,
  ) {
    this.notificationsGateway.notifyUpdatedTaskStatus({
      data: payload,
    });
  }

  @EventPattern('task.priority')
  onTaskUpdatedPriority(
    @Payload()
    payload: UpdatedTaskPriorityNotificationPayload,
  ) {
    this.notificationsGateway.notifyUpdatedTaskPriority({
      data: payload,
    });
  }

  @EventPattern('task.assigned')
  onTaskAssigned(@Payload() payload: AssignedToTaskNotificationPayload) {
    this.notificationsGateway.notifyAssignedUsers({
      data: payload,
    });
  }

  @EventPattern('task.deleted')
  onTaskDeleted(@Payload() payload: DeletedTaskNotificationPayload) {
    this.notificationsGateway.notifyDeletedTask({
      data: payload,
    });
  }

  @EventPattern('task.comment.created')
  onNewComment(@Payload() payload: NewCommentNotificationPayload) {
    this.notificationsGateway.notifyNewComment({
      data: payload,
    });
  }
}
