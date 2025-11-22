import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';
import type { IUsersTasksService } from '../contracts/iusers-tasks-service';

import type {
  CreateUserTaskData,
  Participant,
  UserTask,
} from '@challenge/shared';

export class UsersTasksService implements IUsersTasksService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  listUsersByTaskId(
    taskId: string,
    config?: HttpRequestConfig,
  ): Promise<Participant[]> {
    return this.httpClient.get<Participant[]>(`/users-tasks/${taskId}`, config);
  }

  create(
    data: CreateUserTaskData,
    config?: HttpRequestConfig,
  ): Promise<UserTask> {
    const { taskId, userId } = data;

    return this.httpClient.post<UserTask>(
      `/users-tasks/${taskId}`,
      { userId },
      config,
    );
  }
}
