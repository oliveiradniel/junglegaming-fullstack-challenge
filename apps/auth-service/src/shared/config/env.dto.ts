import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, NotEquals } from 'class-validator';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @Transform(({ value: port }: { value: string }) => {
    return port ? Number(port) : 3002;
  })
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_ACCESS_SECRET: string;

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value: port }: { value: string }) => {
    return port ? Number(port) : 5432;
  })
  POSTGRES_PORT: number;
}
