import axios, { type AxiosInstance } from 'axios';

import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import { env } from '@/config/env';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '@/app/utils/access-token';

import { makeAuthService } from '@/app/factories/make-auth-service';
import { toast } from '@/app/utils/toast';

export class HttpClient implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    const httpClient = axios.create({
      baseURL: env.API_URL,
    });

    httpClient.interceptors.request.use((config) => {
      const accessToken = getAccessToken();

      if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    httpClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest?.url === '/auth/refresh') {
          removeAccessToken();
          return Promise.reject(error);
        }

        if (error.response && error.response.status !== 401) {
          return Promise.reject(error);
        }

        const accessTokenExists = getAccessToken();
        if (!accessTokenExists) {
          return Promise.reject(error);
        }

        if (originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;

        const authService = makeAuthService();

        try {
          const { accessToken } = await authService.refresh();

          setAccessToken(accessToken);

          return httpClient(originalRequest);
        } catch (refreshError) {
          await authService.logout();
          if (error.response && error.response.status === 401) {
            toast({
              type: 'error',
              description: 'Sua sessão expirou, faça login novamente.',
            });
          }

          return Promise.reject(refreshError);
        }
      },
    );

    this.axiosInstance = httpClient;
  }

  async get<ResponseType>(
    path: string,
    config?: HttpRequestConfig,
  ): Promise<ResponseType> {
    const response = await this.axiosInstance.get<ResponseType>(path, {
      ...config,
    });

    return response.data;
  }

  async post<ResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig,
  ): Promise<ResponseType> {
    const response = await this.axiosInstance.post<ResponseType>(path, body, {
      ...config,
    });

    return response.data;
  }

  async put(
    path: string,
    body: unknown,
    config?: HttpRequestConfig,
  ): Promise<void> {
    await this.axiosInstance.put<void>(path, body, {
      ...config,
    });
  }

  async delete(path: string, config?: HttpRequestConfig): Promise<void> {
    await this.axiosInstance.delete<void>(path, {
      ...config,
    });
  }
}
