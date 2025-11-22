import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';
import type { IUsersService } from '../contracts/iusers-service';

import type { UserWithoutPassword } from '@challenge/shared';

export class UsersService implements IUsersService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  list(config?: HttpRequestConfig): Promise<UserWithoutPassword[]> {
    return this.httpClient.get('/users', config);
  }
}
