import type { HttpRequestConfig } from './ihttp-client';

import type {
  CreateTaskData,
  ListTasksPagination,
  Pagination,
  TaskWithCommentCount,
  UpdateTaskData,
} from '@challenge/shared';

export abstract class ITasksService {
  abstract get(
    taskId: string,
    config?: HttpRequestConfig,
  ): Promise<TaskWithCommentCount>;
  abstract list(
    data: Pagination,
    config?: HttpRequestConfig,
  ): Promise<ListTasksPagination>;
  abstract create(
    data: CreateTaskData & { authorId: string },
    config?: HttpRequestConfig,
  ): Promise<TaskWithCommentCount>;
  abstract update(
    taskId: string,
    data: UpdateTaskData & { lastEditedBy: string },
    config?: HttpRequestConfig,
  ): Promise<void>;
  abstract delete(taskId: string, config?: HttpRequestConfig): Promise<void>;
}
