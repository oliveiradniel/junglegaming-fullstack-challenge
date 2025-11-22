import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { TasksService } from '../tasks/tasks.service';
import { UsersTasksService } from '../users-tasks/users-tasks.service';

import type { ICommentsRepository } from 'src/database/contracts/comments-repository.contract';

import type {
  CreateCommentData,
  Pagination,
  TaskComment,
  NewCommentNotificationPayload,
  ListCommentsPagination,
} from '@challenge/shared';

import {
  COMMENTS_REPOSITORY,
  NOTIFICATIONS_SERVICE_RMQ,
} from 'src/shared/constants/tokens';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENTS_REPOSITORY)
    private readonly commentsRepository: ICommentsRepository,
    private readonly usersTasksService: UsersTasksService,
    private readonly tasksService: TasksService,
    @Inject(NOTIFICATIONS_SERVICE_RMQ)
    private readonly notificationsService: ClientProxy,
  ) {}

  async list(
    taskId: string,
    pagination: Pagination,
  ): Promise<ListCommentsPagination> {
    const { page, size } = pagination;

    return this.commentsRepository.list(taskId, { page, size });
  }

  async create(taskId: string, data: CreateCommentData): Promise<TaskComment> {
    const { userId, comment } = data;

    const { title } = await this.tasksService.verifyTaskExists(taskId);

    const assignedUserIds =
      await this.usersTasksService.listUserIdsByTaskId(taskId);

    const createdComment = await this.commentsRepository.create(taskId, {
      userId,
      comment,
    });

    const newCommentPayload: NewCommentNotificationPayload = {
      taskId,
      taskTitle: title,
      comment: {
        id: createdComment.id,
        text: createdComment.comment,
        authorId: createdComment.userId,
        createdAt: createdComment.createdAt,
      },
      participantIds: assignedUserIds,
    };

    this.notificationsService.emit('task.comment.created', newCommentPayload);

    return createdComment;
  }
}
