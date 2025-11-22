import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @Transform(({ value: port }: { value: string }) => {
    return port ? Number(port) : 3004;
  })
  PORT: number;

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

  @IsString()
  @IsNotEmpty()
  FRONTEND_ORIGIN: string;

  @IsString()
  @IsNotEmpty()
  BROKER_URL: string;
}
