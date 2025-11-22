import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateTaskData, TaskPriority, TaskStatus } from '@challenge/shared';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDTO implements CreateTaskData {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'User who created the task.',
  })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({
    example: 'Desenvolver interface de login',
    description: 'Title of the task.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Desenvolva a interface de login com foco em UX e acessibilidade.',
    description: 'Detailed description of the task.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2025-11-28',
    description: 'Deadline for task completion (ISO 8601 format).',
  })
  @Type(() => Date)
  @IsDate()
  term: Date;

  @ApiProperty({
    example: 'LOW',
    description: 'Priority level of the task. Defaults to LOW if not provided.',
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    example: 'TODO',
    description:
      'Current status of the task. Defaults to TODO if not provided.',
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
