import type { TaskPriority } from '@/app/enums/TaskPriority';
import type { TaskStatus } from '@/app/enums/TaskStatus';

export const priorityLabels: Record<TaskPriority, string> = {
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
};

export const statusLabels: Record<TaskStatus, string> = {
  TODO: 'Pendente',
  IN_PROGRESS: 'Em progresso',
  REVIEW: 'Em revisão',
  DONE: 'Concluída',
};
