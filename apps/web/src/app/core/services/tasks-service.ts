import type { ITasksService } from '../contracts/itasks-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type {
  CreateTaskData,
  ListTasksPagination,
  Pagination,
  TaskWithCommentCount,
  UpdateTaskData,
} from '@challenge/shared';

export class TasksService implements ITasksService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  get(
    taskId: string,
    config?: HttpRequestConfig,
  ): Promise<TaskWithCommentCount> {
    return this.httpClient.get<TaskWithCommentCount>(
      `/tasks/${taskId}`,
      config,
    );
  }

  list(
    data: Pagination,
    config?: HttpRequestConfig,
  ): Promise<ListTasksPagination> {
    const { page, size } = data;

    return this.httpClient.get<ListTasksPagination>('/tasks', {
      params: { page, size },
      ...config,
    });
  }

  create(
    data: CreateTaskData,
    config?: HttpRequestConfig,
  ): Promise<TaskWithCommentCount> {
    const { authorId, title, description, term, priority, status } = data;

    return this.httpClient.post<TaskWithCommentCount>(
      '/tasks',
      {
        authorId,
        title,
        description,
        term,
        priority,
        status,
      },
      config,
    );
  }

  async update(
    taskId: string,
    data: UpdateTaskData,
    config?: HttpRequestConfig,
  ): Promise<void> {
    const {
      lastEditedBy,
      userIds,
      title,
      description,
      term,
      priority,
      status,
    } = data;

    await this.httpClient.put(
      `/tasks/${taskId}`,
      {
        lastEditedBy,
        userIds,
        title,
        description,
        term,
        priority,
        status,
      },
      config,
    );
  }

  async delete(taskId: string, config?: HttpRequestConfig): Promise<void> {
    return this.httpClient.delete(`/tasks/${taskId}`, config);
  }
}
