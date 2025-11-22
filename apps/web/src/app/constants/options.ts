import type { TaskPriority } from '../enums/TaskPriority';
import type { TaskStatus } from '../enums/TaskStatus';

interface OptionsTaskPriority {
  id: string;
  value: TaskPriority;
  label: string;
}

interface OptionsTaskStatus {
  id: string;
  value: TaskStatus;
  label: string;
}

const optionsTaskPriority: OptionsTaskPriority[] = [
  {
    id: crypto.randomUUID(),
    value: 'LOW',
    label: 'Baixa',
  },
  {
    id: crypto.randomUUID(),
    value: 'MEDIUM',
    label: 'Média',
  },
  {
    id: crypto.randomUUID(),
    value: 'HIGH',
    label: 'Alta',
  },
  {
    id: crypto.randomUUID(),
    value: 'URGENT',
    label: 'Urgente',
  },
];

const optionsTaskStatus: OptionsTaskStatus[] = [
  {
    id: crypto.randomUUID(),
    value: 'TODO',
    label: 'Pendente',
  },
  {
    id: crypto.randomUUID(),
    value: 'IN_PROGRESS',
    label: 'Em progresso',
  },
  {
    id: crypto.randomUUID(),
    value: 'REVIEW',
    label: 'Em revisão',
  },
  {
    id: crypto.randomUUID(),
    value: 'DONE',
    label: 'Concluída',
  },
];

export { optionsTaskPriority, optionsTaskStatus };
