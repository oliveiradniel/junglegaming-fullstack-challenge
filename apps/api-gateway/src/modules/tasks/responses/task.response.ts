import { TaskComment } from '@challenge/shared';
import { ApiProperty } from '@nestjs/swagger';

export class TaskResponse {
  @ApiProperty({
    example: '68254159-63fe-481a-9841-8bca49cb53bc',
    description: 'Task ID (UUID)',
  })
  id: string;

  @ApiProperty({
    example: 'Desenvolver interface de login',
    description: 'Title of the task',
  })
  title: string;

  @ApiProperty({
    example: 'Desenvolva a interface de login com foco em UX e acessibilidade.',
    description: 'Detailed description of the task',
  })
  description: string;

  @ApiProperty({
    example: '2025-11-28',
    description: 'Task due date',
  })
  term: string;

  @ApiProperty({
    example: 'LOW',
    description: 'Priority level of the task',
  })
  priority: string;

  @ApiProperty({
    example: 'TODO',
    description: 'Current status of the task',
  })
  status: string;

  @ApiProperty({
    example: '2025-11-12T15:07:33.303Z',
    description: 'Task creation date',
  })
  createdAt: Date;

  @ApiProperty({
    example: [
      {
        id: '15a9edbf-97d5-4741-b240-eb491039f73b',
        taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
        userId: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
        comment:
          'A interface está ficando ótima! Talvez possamos adicionar validação em tempo real para melhorar a experiência do usuário.',
        createdAt: '2025-11-13T09:04:29.716Z',
      },
      {
        id: '30b01007-783e-447e-9afa-ef05ec2f03d4',
        taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
        userId: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
        comment:
          'Ótimo progresso! Seria interessante testar diferentes layouts de botão de login para ver qual converte melhor.',
        createdAt: '2025-11-13T09:05:11.050Z',
      },
    ],
    description: 'List of comments associated with the task.',
  })
  comments: TaskComment[];
}
