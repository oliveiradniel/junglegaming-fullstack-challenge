import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import {
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
  TaskAuditLog,
} from '@challenge/shared';

@Injectable()
export class TaskAuditLogsService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
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

  async listTaskCreationAuditLog(): Promise<ListCreationTaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ListCreationTaskAuditLog[]>(
        `${this.baseURL}/creation`,
      ),
    );

    return data;
  }

  async listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ListUpdateTaskAuditLog[]>(`${this.baseURL}/update`),
    );

    const enriched = await Promise.all(
      data.map(async (log) => {
        if (log.fieldName !== 'userIds') {
          return log;
        }

        const oldIds = this.safeParseIds(log.oldValue as string);
        const newIds = this.safeParseIds(log.newValue as string);

        const [oldUsers, newUsers] = await Promise.all([
          this.usersService.findUsers(oldIds),
          this.usersService.findUsers(newIds),
        ]);

        return {
          ...log,
          oldValue: oldUsers.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
          })),
          newValue: newUsers.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
          })),
        };
      }),
    );

    return enriched;
  }

  private safeParseIds(value: string | null | undefined): string[] {
    if (!value) return [];

    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  async listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLog[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<ListDeletionTaskAuditLog[]>(
        `${this.baseURL}/deletion`,
      ),
    );

    return data;
  }
}
