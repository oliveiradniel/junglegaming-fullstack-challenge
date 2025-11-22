import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import { TaskAuditLog } from '@challenge/shared';

@Injectable()
export class TaskAuditLogsService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
  ) {
    this.baseURL = getConfig(configService).TASK_AUDIT_LOGS_SERVICE_BASE_URL;
  }

  async list(): Promise<TaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<TaskAuditLog[]>(this.baseURL),
    );

    return data;
  }
}
