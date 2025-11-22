import { ApiProperty } from '@nestjs/swagger';

import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

import { TaskPriority, TaskStatus, UpdateTaskData } from '@challenge/shared';

export class UpdateTaskDTO implements UpdateTaskData {
  @ApiProperty({
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    description: 'Last user to update the task.',
  })
  @IsUUID('4')
  @IsString()
  @IsNotEmpty()
  lastEditedBy: string;

  @ApiProperty({
    example: 'f95bbf1c-2829-4540-902f-ee718dded518',
    description: 'Optional. List of user IDs to assign to the task.',
    isArray: true,
    type: String,
    required: false,
  })
  @IsUUID('4', { each: true })
  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  userIds?: string[];

  @ApiProperty({
    example: 'Desenvolver interface de login',
    description: 'Optional. Title of the task.',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Desenvolva a interface de login com foco em UX e acessibilidade.',
    description: 'Optional. Detailed description of the task.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2025-11-28',
    description: 'Optional. Deadline for task completion (ISO 8601 format).',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  term?: Date;

  @ApiProperty({
    example: 'LOW',
    description:
      'Optional. Priority level of the task. Defaults to LOW if not provided.',
    required: false,
  })
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @ApiProperty({
    example: 'TODO',
    description:
      'Optional. Current status of the task. Defaults to TODO if not provided.',
    required: false,
  })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
